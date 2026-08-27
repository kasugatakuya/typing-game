"use client";

import { useState } from "react";

/** モバイル幅でのみ表示する「PC推奨」バナー */
export function MobileNotice() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="md:hidden fixed top-14 inset-x-0 z-40 bg-amber-100 border-b border-amber-300 text-amber-800 text-xs px-3 py-2 flex items-center justify-between gap-2">
      <span>
        ⌨️ このゲームはキーボード操作が必要です。PCでのプレイを推奨します。
      </span>
      <button
        onClick={() => setDismissed(true)}
        aria-label="閉じる"
        className="shrink-0 font-bold px-1.5 py-0.5 rounded hover:bg-amber-200 transition-colors"
      >
        ✕
      </button>
    </div>
  );
}
