"use client";

import { useEffect, useState } from "react";
import { usePendingScoreHandler } from "@/app/hooks/usePendingScoreHandler";

export function PendingScoreNotification() {
  const { isProcessing, result, gameMode, clearResult } = usePendingScoreHandler();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (result) {
      setIsVisible(true);
    }
  }, [result]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      clearResult();
    }, 300);
  };

  if (!isProcessing && !result) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-slate-800 rounded-xl shadow-2xl p-6 max-w-sm w-full transform transition-all duration-300 ${
          isVisible ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {isProcessing ? (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <svg className="animate-spin h-8 w-8 text-blue-500" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
            <p className="text-white font-medium">スコアを登録中...</p>
            <p className="text-slate-400 text-sm mt-1">しばらくお待ちください</p>
          </div>
        ) : result ? (
          <div className="text-center">
            {result.success && result.isVerified ? (
              <>
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">
                  ランキングに登録しました!
                </h3>
                {result.rank && (
                  <p className="text-green-400 font-medium mb-4">
                    現在 {result.rank} 位です
                  </p>
                )}
              </>
            ) : result.success ? (
              <>
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-yellow-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">
                  スコアを記録しました
                </h3>
                <p className="text-yellow-400 text-sm mb-4">
                  検証に失敗したため、ランキングには表示されません
                </p>
              </>
            ) : (
              <>
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">
                  登録に失敗しました
                </h3>
                <p className="text-red-400 text-sm mb-4">{result.error}</p>
              </>
            )}
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              閉じる
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
