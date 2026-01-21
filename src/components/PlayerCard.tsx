import React from "react";

interface PlayerCardProps {
  username: string;
  progress: number;
  wpm?: number;
  accuracy?: number;
  disqualified?: boolean;
  dqReason?: string;
  highlight?: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  username,
  progress,
  wpm,
  accuracy,
  disqualified,
  dqReason,
  highlight,
}) => {
  return (
    <div
      className={`p-4 rounded-lg font-mono shadow-lg hover:shadow-xl transition-all duration-200 border-2 ${
        highlight
          ? "bg-accent/20 border-accent scale-105"
          : disqualified
            ? "bg-incorrect/20 border-incorrect"
            : "bg-background border-accent/50 hover:border-accent"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <span
          className={`font-bold text-lg ${
            highlight
              ? "text-accent"
              : disqualified
                ? "text-incorrect"
                : "text-accent"
          }`}
        >
          {highlight && "👤 "}
          {username}
          {highlight && " (You)"}
        </span>
        {disqualified && (
          <span className="px-2 py-1 rounded text-xs font-semibold bg-incorrect text-background border border-incorrect">
            ❌ DQ {dqReason && `(${dqReason})`}
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div className="h-4 bg-background border border-text/30 rounded-lg overflow-hidden mb-2">
        <div
          className={`h-4 rounded-lg transition-all duration-300 ease-out ${
            disqualified ? "bg-incorrect" : "bg-accent"
          }`}
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-sm text-text">
        {wpm !== undefined && (
          <p className="flex items-center gap-1">
            <span>⚡ WPM:</span>
            <strong className="text-accent">{wpm}</strong>
          </p>
        )}
        {accuracy !== undefined && (
          <p className="flex items-center gap-1">
            <span>🎯 Accuracy:</span>
            <strong className="text-accent">{accuracy}%</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
