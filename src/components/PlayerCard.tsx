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
      className={`p-3 rounded-md border ${
        disqualified ? "bg-red-100 border-red-400" : "bg-white border-gray-300"
      }`}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="font-semibold">{username}</span>
        {disqualified && (
          <span className="text-red-600 text-sm">
            ❌ DQ {dqReason && `(${dqReason})`}
          </span>
        )}
      </div>

      <div className="h-2 bg-gray-200 rounded">
        <div
          className={`h-2 rounded ${
            disqualified ? "bg-red-500" : "bg-blue-500"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {wpm !== undefined && (
        <p className="mt-1 text-sm">
          WPM: <strong>{wpm}</strong>
        </p>
      )}
      {accuracy !== undefined && (
        <p className="text-sm">
          Accuracy: <strong>{accuracy}%</strong>
        </p>
      )}
    </div>
  );
};

export default PlayerCard;
