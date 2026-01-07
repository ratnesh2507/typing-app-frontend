import React from "react";

interface RaceResultCardProps {
  raceId: string;
  wpm: number;
  accuracy: number;
  finished: boolean;
  disqualified: boolean;
  finishTime?: string | null; // ⬅️ FIXED
  cheatFlags?: string[];
  onClick?: () => void;
}

const formatFinishTime = (ts: string) => {
  const date = new Date(ts);
  if (isNaN(date.getTime())) return null;

  return date.toLocaleString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "short",
  });
};

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

  const formattedFinishTime =
    finishTime && finished && !disqualified
      ? formatFinishTime(finishTime)
      : null;

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl p-5
                 bg-background/70
                 border border-accent/40
                 shadow-[0_6px_20px_rgba(0,0,0,0.35)]
                 hover:shadow-[0_10px_30px_rgba(255,238,99,0.35)]
                 hover:-translate-y-0.5
                 transition-all duration-300
                 font-mono"
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

        {formattedFinishTime && (
          <p className="col-span-2 text-text/80">
            Finished at:{" "}
            <span className="font-semibold">{formattedFinishTime}</span>
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
