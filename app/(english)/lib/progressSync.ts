import { createClient } from "@/app/lib/supabase/client";
import {
  getProgressSnapshot,
  onProgressChange,
  replaceProgress,
  type ItemProgress,
  type ProgressMap,
} from "@/app/(english)/lib/progress";

/**
 * 学習記録を Supabase の english_progress テーブルと同期する。
 * テーブルは supabase/migrations/20261113_english_progress.sql で作成する。
 * テーブルが無い・通信できない場合は何もせず、localStorage の記録だけで動く。
 */

const TABLE = "english_progress";
/** この端末の記録がどのユーザーのものかを覚えておくキー */
const OWNER_KEY = "english-progress-owner";
const PAGE_SIZE = 1000;
const UPSERT_CHUNK = 500;
const FLUSH_DELAY_MS = 1500;

interface ProgressRow {
  user_id: string;
  item_key: string;
  correct: number;
  wrong: number;
  streak: number;
  last_at: string;
}

type SupabaseClient = NonNullable<ReturnType<typeof createClient>>;

let activeUserId: string | null = null;
/** テーブルが無いなど、同期できないと分かった場合は以降の送信をやめる */
let disabled = false;
const pending = new Map<string, ItemProgress>();
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let unsubscribe: (() => void) | null = null;

function toRow(userId: string, key: string, value: ItemProgress): ProgressRow {
  return {
    user_id: userId,
    item_key: key,
    correct: value.correct,
    wrong: value.wrong,
    streak: value.streak,
    last_at: new Date(value.last).toISOString(),
  };
}

function handleError(error: { code?: string; message?: string }) {
  // 42P01: テーブルが存在しない / PGRST205: PostgREST がテーブルを見つけられない
  if (error.code === "42P01" || error.code === "PGRST205") {
    disabled = true;
    console.warn(
      "english_progress テーブルが見つかりません。supabase/migrations/20261113_english_progress.sql を実行すると学習記録が同期されます。",
    );
    return;
  }
  console.warn("学習記録の同期に失敗しました:", error.message);
}

async function fetchRemote(
  supabase: SupabaseClient,
  userId: string,
): Promise<ProgressMap | null> {
  const remote: ProgressMap = {};
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await supabase
      .from(TABLE as never)
      .select("item_key, correct, wrong, streak, last_at")
      .eq("user_id", userId as never)
      .order("item_key", { ascending: true })
      .range(from, from + PAGE_SIZE - 1);
    if (error) {
      handleError(error);
      return null;
    }
    const rows = (data as unknown as ProgressRow[] | null) ?? [];
    for (const row of rows) {
      remote[row.item_key] = {
        correct: row.correct,
        wrong: row.wrong,
        streak: row.streak,
        last: new Date(row.last_at).getTime(),
      };
    }
    if (rows.length < PAGE_SIZE) break;
  }
  return remote;
}

async function upsert(supabase: SupabaseClient, rows: ProgressRow[]) {
  for (let i = 0; i < rows.length; i += UPSERT_CHUNK) {
    const { error } = await supabase
      .from(TABLE as never)
      .upsert(rows.slice(i, i + UPSERT_CHUNK) as never, {
        onConflict: "user_id,item_key",
      });
    if (error) {
      handleError(error);
      return false;
    }
  }
  return true;
}

/** 回数の多いほう・更新の新しいほうを残す */
function isNewer(a: ItemProgress, b: ItemProgress): boolean {
  if (a.last !== b.last) return a.last > b.last;
  return a.correct + a.wrong > b.correct + b.wrong;
}

async function flush() {
  flushTimer = null;
  const supabase = createClient();
  if (!supabase || !activeUserId || disabled || pending.size === 0) return;
  const userId = activeUserId;
  const rows = [...pending].map(([key, value]) => toRow(userId, key, value));
  pending.clear();
  await upsert(supabase, rows);
}

/**
 * ログイン時に呼ぶ。サーバーの記録とこの端末の記録を突き合わせ、
 * 新しいほうを双方に反映したうえで、以降の更新を自動送信する。
 */
export async function startProgressSync(userId: string) {
  const supabase = createClient();
  if (!supabase || disabled) return;
  if (activeUserId === userId) return;
  activeUserId = userId;

  const remote = await fetchRemote(supabase, userId);
  if (!remote || activeUserId !== userId) return;

  // 別のユーザーの記録が端末に残っている場合は混ぜず、サーバーの記録だけを使う
  let owner: string | null = null;
  try {
    owner = window.localStorage.getItem(OWNER_KEY);
  } catch {
    // 読めない場合は未ログインの記録として扱う
  }
  const local = owner === null || owner === userId ? getProgressSnapshot() : {};

  const merged: ProgressMap = { ...remote };
  const toPush: ProgressRow[] = [];
  for (const [key, value] of Object.entries(local)) {
    const server = remote[key];
    if (!server || isNewer(value, server)) {
      merged[key] = value;
      toPush.push(toRow(userId, key, value));
    }
  }

  replaceProgress(merged);
  try {
    window.localStorage.setItem(OWNER_KEY, userId);
  } catch {
    // 保存できなくても同期自体は続ける
  }
  if (toPush.length > 0) await upsert(supabase, toPush);

  unsubscribe?.();
  unsubscribe = onProgressChange((key, value) => {
    if (disabled || !activeUserId) return;
    pending.set(key, value);
    // 1問ごとに通信しないよう、少し待ってまとめて送る
    if (flushTimer === null) flushTimer = setTimeout(flush, FLUSH_DELAY_MS);
  });
}

/** ログアウト時に呼ぶ。未送信分を送ってから自動送信を止める */
export function stopProgressSync() {
  if (flushTimer !== null) {
    clearTimeout(flushTimer);
    void flush();
  }
  unsubscribe?.();
  unsubscribe = null;
  activeUserId = null;
}
