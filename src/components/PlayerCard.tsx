import React from "react";

interface PlayerCardProps {
  username: string;
  progress: number;
  wpm?: number;
  accuracy?: number;
  disqualified?: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  username,
  progress,
  wpm,
  accuracy,
  disqualified,
}) => {
  return (
    <div
      className={`p-2 rounded-md border ${
        disqualified ? "bg-red-200" : "bg-white"
      }`}
    >
      <p className="font-semibold">
        {username} {disqualified && "(DQ)"}
      </p>
      <p>Progress: {progress}%</p>
      {wpm !== undefined && <p>WPM: {wpm}</p>}
      {accuracy !== undefined && <p>Accuracy: {accuracy}%</p>}
    </div>
  );
};

export default PlayerCard;
