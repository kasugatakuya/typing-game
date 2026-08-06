interface RomajiDisplayProps {
  input: string;
  romaji: string;
  showMistake: boolean;
  className?: string;
}

export function RomajiDisplay({
  input,
  romaji,
  showMistake,
  className = "text-lg",
}: RomajiDisplayProps) {
  return (
    <p
      className={`${className} text-center font-mono ${showMistake ? "animate-shake text-red-500" : ""}`}
    >
      <span className={showMistake ? "" : "text-green-600"}>{input}</span>
      <span className={showMistake ? "" : "text-gray-400"}>
        {romaji.slice(input.length)}
      </span>
    </p>
  );
}
