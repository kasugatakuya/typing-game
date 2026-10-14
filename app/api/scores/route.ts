import { createClient } from "@/app/lib/supabase/server";
import { NextResponse } from "next/server";
import {
  GAME_MODES,
  type GameCategory,
  type QuestionTimestamp,
  type ScoreSubmitRequest,
} from "@/app/types/score";
import type { Database } from "@/app/types/database";

type ScoreInsert = Database["public"]["Tables"]["scores"]["Insert"];

// Minimum milliseconds per character (prevents superhuman speeds)
const MIN_MS_PER_CHAR = 40;
// Maximum allowed time mismatch between calculated and reported total time
const MAX_TIME_MISMATCH_MS = 500;
// 端末の時計ずれを許容する幅（これより未来のタイムスタンプは拒否）
const MAX_CLOCK_SKEW_MS = 5 * 60 * 1000;
// これより古いプレイは受け付けない（ペンディングスコアの保持期間より十分長い）
const MAX_SCORE_AGE_MS = 24 * 60 * 60 * 1000;

interface ValidationResult {
  isValid: boolean;
  reason?: string;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isGameCategory(value: unknown): value is GameCategory {
  return typeof value === "string" && value in GAME_MODES;
}

/**
 * リクエストボディの型・形を検証する。
 * ここで弾いたものは 400 を返し、DB には保存しない。
 */
function parseRequestBody(body: unknown): ScoreSubmitRequest | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;

  if (!isGameCategory(b.gameCategory)) return null;
  if (typeof b.gameMode !== "string" || !(b.gameMode in GAME_MODES[b.gameCategory])) {
    return null;
  }
  if (!isFiniteNumber(b.clearTimeMs) || b.clearTimeMs <= 0) return null;
  if (!isFiniteNumber(b.questionCount) || b.questionCount <= 0) return null;
  if (!Array.isArray(b.questionTimestamps)) return null;

  const timestamps: QuestionTimestamp[] = [];
  for (const raw of b.questionTimestamps) {
    if (!raw || typeof raw !== "object") return null;
    const t = raw as Record<string, unknown>;
    if (
      !isFiniteNumber(t.questionIndex) ||
      !isFiniteNumber(t.startTime) ||
      !isFiniteNumber(t.endTime) ||
      !isFiniteNumber(t.romajiLength) ||
      typeof t.targetRomaji !== "string"
    ) {
      return null;
    }
    timestamps.push({
      questionIndex: t.questionIndex,
      startTime: t.startTime,
      endTime: t.endTime,
      romajiLength: t.romajiLength,
      targetRomaji: t.targetRomaji,
    });
  }

  return {
    gameCategory: b.gameCategory,
    gameMode: b.gameMode,
    clearTimeMs: Math.round(b.clearTimeMs),
    mistakeCount: isFiniteNumber(b.mistakeCount) && b.mistakeCount >= 0 ? Math.round(b.mistakeCount) : 0,
    keystrokeCount: isFiniteNumber(b.keystrokeCount) && b.keystrokeCount >= 0 ? Math.round(b.keystrokeCount) : 0,
    questionCount: Math.round(b.questionCount),
    questionTimestamps: timestamps,
  };
}

/**
 * スコア内容の妥当性を検証する。
 * ここで弾いたものは is_verified = false として保存し、ランキングには載せない。
 */
function validateScore(data: ScoreSubmitRequest, now: number): ValidationResult {
  const { gameCategory, gameMode, clearTimeMs, questionTimestamps, questionCount } = data;

  // 0. Question count must match the mode definition
  const expectedCount = GAME_MODES[gameCategory][gameMode].questionCount;
  if (questionCount !== expectedCount) {
    return {
      isValid: false,
      reason: `QUESTION_COUNT_MISMATCH: mode ${gameMode} expects ${expectedCount}, got ${questionCount}`,
    };
  }

  // 1. Basic count check
  if (questionTimestamps.length !== questionCount) {
    return {
      isValid: false,
      reason: `TIMESTAMP_COUNT_MISMATCH: expected ${questionCount}, got ${questionTimestamps.length}`,
    };
  }

  if (questionTimestamps.length === 0) {
    return {
      isValid: false,
      reason: "EMPTY_TIMESTAMPS",
    };
  }

  // 2. Check timestamp continuity
  for (let i = 1; i < questionTimestamps.length; i++) {
    const prev = questionTimestamps[i - 1];
    const curr = questionTimestamps[i];

    if (curr.startTime < prev.endTime) {
      return {
        isValid: false,
        reason: `TIMESTAMP_ORDER_INVALID: q${i} startTime (${curr.startTime}) < q${i - 1} endTime (${prev.endTime})`,
      };
    }
  }

  // 3. Check typing speed and romaji length for each question
  for (const ts of questionTimestamps) {
    const duration = ts.endTime - ts.startTime;

    if (duration <= 0) {
      return {
        isValid: false,
        reason: `INVALID_DURATION: q${ts.questionIndex} has duration ${duration}ms`,
      };
    }

    // 入力ゆれ（shi/si, nn/n, ja/jya 等）を考慮しても、
    // 実際の打鍵数は正規表記の 1/2 〜 2 倍の範囲に収まる
    const targetLength = ts.targetRomaji.length;
    const minLength = Math.max(1, Math.floor(targetLength / 2));
    const maxLength = targetLength * 2;
    if (targetLength === 0 || ts.romajiLength < minLength || ts.romajiLength > maxLength) {
      return {
        isValid: false,
        reason: `ROMAJI_LENGTH_MISMATCH: q${ts.questionIndex} typed ${ts.romajiLength} chars for target "${ts.targetRomaji}" (${targetLength})`,
      };
    }

    const minRequiredTime = ts.romajiLength * MIN_MS_PER_CHAR;
    if (duration < minRequiredTime) {
      return {
        isValid: false,
        reason: `INHUMAN_SPEED: q${ts.questionIndex} took ${duration}ms for ${ts.romajiLength} chars (min: ${minRequiredTime}ms)`,
      };
    }
  }

  // 4. Check total time consistency
  const firstStart = questionTimestamps[0].startTime;
  const lastEnd = questionTimestamps[questionTimestamps.length - 1].endTime;
  const calculatedTotalTime = lastEnd - firstStart;

  if (Math.abs(calculatedTotalTime - clearTimeMs) > MAX_TIME_MISMATCH_MS) {
    return {
      isValid: false,
      reason: `TOTAL_TIME_MISMATCH: calculated ${calculatedTotalTime}ms vs reported ${clearTimeMs}ms (diff: ${Math.abs(calculatedTotalTime - clearTimeMs)}ms)`,
    };
  }

  // 5. Timestamps must be plausible relative to the server clock
  if (lastEnd > now + MAX_CLOCK_SKEW_MS) {
    return {
      isValid: false,
      reason: `FUTURE_TIMESTAMP: endTime ${lastEnd} is ahead of server time ${now}`,
    };
  }
  if (firstStart < now - MAX_SCORE_AGE_MS) {
    return {
      isValid: false,
      reason: `STALE_TIMESTAMP: startTime ${firstStart} is too old (server time ${now})`,
    };
  }

  return { isValid: true };
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized", isVerified: false },
        { status: 401 }
      );
    }

    // Parse and shape-check request body
    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      rawBody = null;
    }
    const body = parseRequestBody(rawBody);
    if (!body) {
      return NextResponse.json(
        { success: false, error: "Invalid request body", isVerified: false },
        { status: 400 }
      );
    }

    // Validate score
    const validation = validateScore(body, Date.now());

    // 自己ベスト判定用に、登録前の自己ベストを取得しておく
    let previousBestMs: number | null = null;
    if (validation.isValid) {
      const { data: prevBestData } = await supabase
        .from("scores")
        .select("clear_time_ms")
        .eq("user_id", user.id as never)
        .eq("game_category", body.gameCategory as never)
        .eq("game_mode", body.gameMode as never)
        .eq("is_verified", true as never)
        .order("clear_time_ms", { ascending: true })
        .limit(1)
        .maybeSingle();
      const prevBest = prevBestData as { clear_time_ms: number } | null;
      previousBestMs = prevBest?.clear_time_ms ?? null;
    }

    // Insert score
    const scoreData: ScoreInsert = {
      user_id: user.id,
      game_category: body.gameCategory,
      game_mode: body.gameMode,
      clear_time_ms: body.clearTimeMs,
      mistake_count: body.mistakeCount,
      keystroke_count: body.keystrokeCount,
      question_count: body.questionCount,
      question_timestamps: JSON.parse(JSON.stringify(body.questionTimestamps)),
      is_verified: validation.isValid,
      verification_failed_reason: validation.reason || null,
    };

    const { data: scoreData2, error: insertError } = await supabase
      .from("scores")
      .insert(scoreData as never)
      .select()
      .single();

    const score = scoreData2 as { id: string } | null;

    if (insertError) {
      console.error("Insert error:", insertError);
      return NextResponse.json(
        { success: false, error: "Failed to save score", isVerified: false },
        { status: 500 }
      );
    }

    // Get rank if verified.
    // ランキングはユーザーごとのベストタイムで集計するため、
    // 「自分より速いタイムを持つユーザー数 + 1」を順位とする。
    let rank: number | undefined;
    if (validation.isValid && score) {
      const { data: fasterRows } = await supabase
        .from("scores")
        .select("user_id")
        .eq("game_category", body.gameCategory as never)
        .eq("game_mode", body.gameMode as never)
        .eq("is_verified", true as never)
        .lt("clear_time_ms", body.clearTimeMs as never);

      const fasterUsers = new Set(
        ((fasterRows as { user_id: string }[] | null) ?? [])
          .map((r) => r.user_id)
          .filter((id) => id !== user.id)
      );
      rank = fasterUsers.size + 1;
    }

    const isPersonalBest =
      validation.isValid &&
      (previousBestMs === null || body.clearTimeMs < previousBestMs);

    return NextResponse.json({
      success: true,
      scoreId: score?.id,
      rank,
      isVerified: validation.isValid,
      isPersonalBest,
      previousBestMs,
      error: validation.isValid ? undefined : validation.reason,
    });
  } catch (error) {
    console.error("Score submission error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error", isVerified: false },
      { status: 500 }
    );
  }
}
