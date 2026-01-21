import React from "react";

interface RaceResultCardProps {
  raceId: string;
  wpm: number;
  accuracy: number;
  finished: boolean;
  disqualified: boolean;
  finishTime?: string | null;
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
    ? "text-incorrect"
    : finished
      ? "text-correct"
      : "text-text";

  const statusEmoji = disqualified ? "❌" : finished ? "✅" : "⏸️";

  const formattedFinishTime =
    finishTime && finished && !disqualified
      ? formatFinishTime(finishTime)
      : null;

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl p-5
                 bg-background
                 border-2 border-accent/50
                 shadow-lg
                 hover:shadow-[0_10px_30px_rgba(255,238,99,0.4)]
                 hover:border-accent
                 hover:-translate-y-1
                 hover:scale-[1.02]
                 transition-all duration-300
                 font-mono"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-accent flex items-center gap-2">
          🏁 Race #{raceId}
        </h3>
        <span
          className={`text-sm font-semibold flex items-center gap-1 ${statusColor}`}
        >
          {statusEmoji} {statusLabel}
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-text">⚡ WPM:</span>
          <span className="font-bold text-accent">{wpm}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-text">🎯 Accuracy:</span>
          <span className="font-bold text-accent">{accuracy}%</span>
        </div>

        {formattedFinishTime && (
          <div className="col-span-2 flex items-center gap-2 text-text pt-2 border-t border-accent/30">
            <span>🕐 Finished at:</span>
            <span className="font-semibold text-accent">
              {formattedFinishTime}
            </span>
          </div>
        )}

        {cheatFlags.length > 0 && (
          <div className="col-span-2 mt-2 p-2 rounded-md bg-incorrect/20 border border-incorrect">
            <p className="text-incorrect text-xs font-semibold flex items-center gap-1">
              ⚠️ Flags:{" "}
              <span className="font-normal">{cheatFlags.join(", ")}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RaceResultCard;
