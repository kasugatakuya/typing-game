interface TypingTextProps {
  text: string;
  /** 入力済みの文字数 */
  position: number;
  /** true のとき未入力の英数字を伏せ字にする（テストモード） */
  masked: boolean;
  showMistake: boolean;
}

const LETTER = /[A-Za-z0-9]/;

/** 英語の出題文。入力済みは緑、未入力は灰色または伏せ字で表示する（ミス時は次の1文字を赤くする） */
export function TypingText({
  text,
  position,
  masked,
  showMistake,
}: TypingTextProps) {
  return (
    <p
      aria-label={masked ? "英語を思い出して入力" : text}
      className={`font-mono text-2xl sm:text-3xl leading-relaxed tracking-wider whitespace-pre-wrap wrap-break-word text-center ${
        showMistake ? "animate-shake" : ""
      }`}
    >
      {Array.from(text).map((char, i) => {
        if (i < position) {
          return (
            <span key={i} className="text-green-600">
              {char}
            </span>
          );
        }
        const isCurrent = i === position;
        const shown = masked && LETTER.test(char) ? "_" : char;
        return (
          <span
            key={i}
            className={
              isCurrent && showMistake ? "text-red-500" : "text-gray-400"
            }
          >
            {shown}
          </span>
        );
      })}
    </p>
  );
}
