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
    <textarea
      className={`
        w-full
        rounded-md
        p-4
        text-lg
        font-mono
        bg-background
        text-text
        border-2
        ${disqualified ? "border-incorrect" : "border-gray-700"}
        placeholder:text-gray-500
        focus:outline-none
        focus:ring-2
        focus:ring-accent
        focus:border-accent
        transition
        duration-200
        caret-accent
        ${disqualified || finished ? "opacity-70 cursor-not-allowed" : ""}
      `}
      rows={3}
      value={typed}
      onChange={handleTyping}
      disabled={disqualified || finished}
      placeholder={
        disqualified
          ? "You are disqualified"
          : finished
          ? "Finished!"
          : "Start typing..."
      }
    />
  );
};

export default TypingArea;
