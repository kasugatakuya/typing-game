import { createClient } from "@/app/lib/supabase/server";
import { NextResponse } from "next/server";
import type { ScoreSubmitRequest } from "@/app/types/score";
import type { Database } from "@/app/types/database";

type ScoreInsert = Database["public"]["Tables"]["scores"]["Insert"];

// Minimum milliseconds per character (prevents superhuman speeds)
const MIN_MS_PER_CHAR = 40;
// Maximum allowed time mismatch between calculated and reported total time
const MAX_TIME_MISMATCH_MS = 500;

interface ValidationResult {
  isValid: boolean;
  reason?: string;
}

function validateScore(data: ScoreSubmitRequest): ValidationResult {
  const { clearTimeMs, questionTimestamps, questionCount } = data;

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

  // 3. Check typing speed for each question
  for (const ts of questionTimestamps) {
    const duration = ts.endTime - ts.startTime;
    const minRequiredTime = ts.romajiLength * MIN_MS_PER_CHAR;

    if (duration < minRequiredTime) {
      return {
        isValid: false,
        reason: `INHUMAN_SPEED: q${ts.questionIndex} took ${duration}ms for ${ts.romajiLength} chars (min: ${minRequiredTime}ms)`,
      };
    }

    // Also check for negative or zero duration
    if (duration <= 0) {
      return {
        isValid: false,
        reason: `INVALID_DURATION: q${ts.questionIndex} has duration ${duration}ms`,
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

    // Parse request body
    const body: ScoreSubmitRequest = await request.json();

    // Validate required fields
    if (
      !body.gameCategory ||
      !body.gameMode ||
      !body.clearTimeMs ||
      !body.questionCount ||
      !body.questionTimestamps
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields", isVerified: false },
        { status: 400 }
      );
    }

    // Validate score
    const validation = validateScore(body);

    // Insert score
    const scoreData: ScoreInsert = {
      user_id: user.id,
      game_category: body.gameCategory,
      game_mode: body.gameMode,
      clear_time_ms: body.clearTimeMs,
      mistake_count: body.mistakeCount || 0,
      keystroke_count: body.keystrokeCount || 0,
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

    // Get rank if verified
    let rank: number | undefined;
    if (validation.isValid && score) {
      const { count } = await supabase
        .from("scores")
        .select("*", { count: "exact", head: true })
        .eq("game_category", body.gameCategory as never)
        .eq("game_mode", body.gameMode as never)
        .eq("is_verified", true as never)
        .lt("clear_time_ms", body.clearTimeMs as never);

      rank = (count || 0) + 1;
    }

    return NextResponse.json({
      success: true,
      scoreId: score?.id,
      rank,
      isVerified: validation.isValid,
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
