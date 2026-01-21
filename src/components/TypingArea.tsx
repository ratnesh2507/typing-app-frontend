import React from "react";

interface TypingAreaProps {
  typed: string;
  handleTyping: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disqualified?: boolean;
  finished?: boolean;
}

const TypingArea: React.FC<TypingAreaProps> = ({
  typed,
  handleTyping,
  disqualified = false,
  finished = false,
}) => {
  return (
    <div className="relative">
      <textarea
        className={`
          w-full
          rounded-lg
          p-4
          text-lg
          font-mono
          bg-background
          text-accent
          border-2
          ${
            disqualified
              ? "border-incorrect"
              : finished
                ? "border-correct"
                : "border-accent/50"
          }
          placeholder:text-text/50
          focus:outline-none
          focus:ring-2
          focus:ring-accent
          focus:border-accent
          hover:border-accent
          transition-all
          duration-200
          caret-accent
          shadow-lg
          ${disqualified || finished ? "opacity-60 cursor-not-allowed" : ""}
        `}
        rows={3}
        value={typed}
        onChange={handleTyping}
        disabled={disqualified || finished}
        placeholder={
          disqualified
            ? "❌ You are disqualified"
            : finished
              ? "✅ Finished! Great job!"
              : "⌨️ Start typing..."
        }
      />

      {/* Status indicator */}
      {(disqualified || finished) && (
        <div
          className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-mono font-bold ${
            disqualified
              ? "bg-incorrect text-background"
              : "bg-correct text-background"
          }`}
        >
          {disqualified ? "❌ DISQUALIFIED" : "✅ FINISHED"}
        </div>
      )}
    </div>
  );
};

export default TypingArea;
