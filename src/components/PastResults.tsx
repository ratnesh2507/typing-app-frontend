import React from "react";

interface RaceResultCardProps {
  raceId: string;
  wpm: number;
  accuracy: number;
  finished: boolean;
  disqualified: boolean;
  finishTime?: number | null;
  cheatFlags?: string[];
  onClick?: () => void;
}

const RaceResultCard: React.FC<RaceResultCardProps> = ({
  raceId,
  wpm,
  accuracy,
  finished,
  disqualified,
  finishTime,
  cheatFlags = [],
  onClick,
}) => {
  const statusLabel = disqualified
    ? "Disqualified"
    : finished
    ? "Finished"
    : "DNF";

  const statusColor = disqualified
    ? "text-wrong"
    : finished
    ? "text-correct"
    : "text-accent/70";

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl p-5 bg-background/60
                 border border-accent
                 shadow-[0_0_12px_#FFEE63]
                 hover:shadow-[0_0_22px_#FFEE63]
                 transition-all duration-300 font-mono"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-accent">Race #{raceId}</h3>

        <span className={`text-sm font-semibold ${statusColor}`}>
          {statusLabel}
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 text-sm text-text">
        <p>
          WPM: <span className="font-semibold">{wpm}</span>
        </p>

        <p>
          Accuracy: <span className="font-semibold">{accuracy}%</span>
        </p>

        {finishTime && (
          <p className="col-span-2">
            Finish Time:{" "}
            <span className="font-semibold">
              {(finishTime / 1000).toFixed(2)}s
            </span>
          </p>
        )}

        {cheatFlags.length > 0 && (
          <p className="col-span-2 text-wrong text-xs">
            ⚠ Flags: {cheatFlags.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
};

export default RaceResultCard;
