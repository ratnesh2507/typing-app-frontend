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
      className="p-3 rounded-lg font-mono shadow-md hover:shadow-lg transition-shadow duration-200"
      style={{
        backgroundColor: disqualified ? "#00D1FF" : "#1A1A2E", // incorrect : background
        borderColor: disqualified ? "#00D1FF" : "#FFEE63", // incorrect : accent
        color: disqualified ? "#1A1A2E" : "#6B728E", // background : text
      }}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="font-semibold">{username}</span>
        {disqualified && (
          <span
            className="px-1 rounded text-sm"
            style={{
              backgroundColor: "#00D1FF",
              color: "#1A1A2E",
            }}
          >
            ❌ DQ {dqReason && `(${dqReason})`}
          </span>
        )}
      </div>

      <div className="h-3 bg-gray-700 rounded overflow-hidden">
        <div
          className="h-3 rounded"
          style={{
            width: `${progress}%`,
            backgroundColor: disqualified ? "#00D1FF" : "#FFEE63",
            transition: "width 0.3s ease",
          }}
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
