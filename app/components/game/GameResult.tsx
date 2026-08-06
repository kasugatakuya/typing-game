import { formatTime } from "@/app/utils/timeUtils";
import { ShareButtons } from "@/app/components/ShareButtons";
import { ScoreSubmitButton } from "@/app/components/score/ScoreSubmitButton";
import type { QuestionTimestamp, GameCategory } from "@/app/types/score";

type ResultSize = "sm" | "md" | "lg";

const sizeStyles: Record<
  ResultSize,
  { container: string; value: string }
> = {
  sm: { container: "gap-5", value: "text-sm" },
  md: { container: "gap-6 mb-4", value: "text-lg" },
  lg: { container: "gap-8 mb-6", value: "text-xl" },
};

interface GameResultProps {
  gameName: string;
  shareMode?: string;
  gameCategory: GameCategory;
  gameMode: string;
  clearTimeMs: number;
  mistakeCount: number;
  keystrokeCount: number;
  questionCount: number;
  questionTimestamps: QuestionTimestamp[];
  averageSpeed: string;
  size?: ResultSize;
}

/** ゲーム終了時のスタッツ・シェアボタン・ランキング登録ボタン */
export function GameResult({
  gameName,
  shareMode = "",
  gameCategory,
  gameMode,
  clearTimeMs,
  mistakeCount,
  keystrokeCount,
  questionCount,
  questionTimestamps,
  averageSpeed,
  size = "md",
}: GameResultProps) {
  const styles = sizeStyles[size];

  return (
    <>
      <div className={`flex justify-center ${styles.container}`}>
        <div>
          <p className="text-xs text-gray-500">タイム</p>
          <p className={`${styles.value} font-bold text-gray-800`}>
            {formatTime(clearTimeMs)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">ミス</p>
          <p className={`${styles.value} font-bold text-gray-800`}>
            {mistakeCount}回
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">速度</p>
          <p className={`${styles.value} font-bold text-gray-800`}>
            {averageSpeed}打/秒
          </p>
        </div>
      </div>
      <ShareButtons
        time={formatTime(clearTimeMs)}
        mistakes={mistakeCount}
        speed={averageSpeed}
        gameName={gameName}
        mode={shareMode}
      />
      <ScoreSubmitButton
        gameCategory={gameCategory}
        gameMode={gameMode}
        clearTimeMs={clearTimeMs}
        mistakeCount={mistakeCount}
        keystrokeCount={keystrokeCount}
        questionCount={questionCount}
        questionTimestamps={questionTimestamps}
      />
    </>
  );
}
