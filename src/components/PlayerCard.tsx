import React from "react";

interface PlayerCardProps {
  username: string;
  progress: number;
  wpm?: number;
  accuracy?: number;
  disqualified?: boolean;
  dqReason?: string;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  username,
  progress,
  wpm,
  accuracy,
  disqualified,
  dqReason,
}) => {
  return (
    <div
      className={`p-3 rounded-lg border font-mono ${
        disqualified
          ? "bg-incorrect border-incorrect text-background"
          : "bg-background border-accent text-text"
      } shadow-md hover:shadow-lg transition-shadow duration-200`}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="font-semibold">{username}</span>
        {disqualified && (
          <span className="text-background bg-incorrect px-1 rounded text-sm">
            ❌ DQ {dqReason && `(${dqReason})`}
          </span>
        )}
      </div>

      <div className="h-3 bg-gray-700 rounded overflow-hidden">
        <div
          className={`h-3 rounded ${
            disqualified ? "bg-incorrect" : "bg-correct"
          }`}
          style={{ width: `${progress}%`, transition: "width 0.3s ease" }}
        />
      </div>

      <div className="mt-1 flex gap-4 text-sm">
        {wpm !== undefined && (
          <p>
            WPM: <strong>{wpm}</strong>
          </p>
        )}
        {accuracy !== undefined && (
          <p>
            Accuracy: <strong>{accuracy}%</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
