"use client";

import { useEffect } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import {
  startProgressSync,
  stopProgressSync,
} from "@/app/(english)/lib/progressSync";

/** ログイン中、学習記録を Supabase と同期する（画面には何も表示しない） */
export function ProgressSync() {
  const { user } = useAuth();
  const userId = user?.id ?? null;

  useEffect(() => {
    if (!userId) return;
    void startProgressSync(userId);
    return () => stopProgressSync();
  }, [userId]);

  return null;
}
