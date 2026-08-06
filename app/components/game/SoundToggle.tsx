"use client";

import { useSyncExternalStore } from "react";
import { sounds } from "@/app/lib/sounds";

/** 効果音ON/OFF切り替えボタン（画面右下に固定表示） */
export function SoundToggle() {
  const enabled = useSyncExternalStore(
    sounds.subscribe,
    sounds.getSnapshot,
    sounds.getServerSnapshot,
  );

  return (
    <button
      onClick={() => sounds.toggle()}
      aria-label={enabled ? "効果音をオフにする" : "効果音をオンにする"}
      title={enabled ? "効果音: ON" : "効果音: OFF"}
      className="fixed bottom-4 right-4 z-40 w-11 h-11 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:shadow-xl transition-all"
    >
      {enabled ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z"
          />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 9l4 6m0-6l-4 6"
          />
        </svg>
      )}
    </button>
  );
}
