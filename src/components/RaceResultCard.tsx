import React from "react";

interface RaceResultCardProps {
  raceId: string;
  date: string; // formatted date
  totalPlayers: number;
  finishedPlayers: number;
  avgWpm: number;
  fastestUser: string;
  fastestWpm: number;
  onClick?: () => void;
}

const RaceResultCard: React.FC<RaceResultCardProps> = ({
  raceId,
  date,
  totalPlayers,
  finishedPlayers,
  avgWpm,
  fastestUser,
  fastestWpm,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl p-5 bg-background/60 border border-accent 
                 shadow-[0_0_12px_#FFEE63] hover:shadow-[0_0_22px_#FFEE63]
                 transition-all duration-300 font-mono"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-accent">
          Race #{raceId.slice(0, 6)}
        </h3>
        <span className="text-sm text-accent/70">{date}</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 text-sm text-text">
        <p>
          Players:{" "}
          <span className="font-semibold">
            {finishedPlayers}/{totalPlayers}
          </span>
        </p>

        <p>
          Avg WPM: <span className="font-semibold">{avgWpm}</span>
        </p>

        <p className="col-span-2">
          🏆 Fastest:{" "}
          <span className="font-semibold text-correct">
            {fastestUser} ({fastestWpm} WPM)
          </span>
        </p>
      </div>
    </div>
  );
};

export default RaceResultCard;
