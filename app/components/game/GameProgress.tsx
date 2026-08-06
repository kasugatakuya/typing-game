import { formatTime } from "@/app/utils/timeUtils";

interface GameProgressProps {
  currentTime: number;
  mistakeCount: number;
  completedCount: number;
  itemCount: number;
  barColorClass?: string;
  timeLabel?: string;
}

/** プレイ中の経過時間・ミス数・進捗バーの表示 */
export function GameProgress({
  currentTime,
  mistakeCount,
  completedCount,
  itemCount,
  barColorClass = "bg-blue-400",
  timeLabel = "経過時間",
}: GameProgressProps) {
  return (
    <>
      <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
        <span>
          {timeLabel}: {formatTime(currentTime)}
        </span>
        <span>ミス: {mistakeCount}回</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${barColorClass}`}
          style={{
            width: `${(completedCount / itemCount) * 100}%`,
          }}
        />
      </div>
      <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
        <span>ESCキーで中断</span>
        <span>
          {completedCount} / {itemCount}
        </span>
      </div>
    </>
  );
}
