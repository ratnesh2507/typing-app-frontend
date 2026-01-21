import React from "react";

/* =======================
   Types
======================= */

export type Participant = {
  clerk_id: string;
  username: string;
  wpm: number;
  accuracy: number;
  chars_typed: number;
  correct_chars: number;
  finished: boolean;
  disqualified: boolean;
  finish_time: string | null;
  cheat_flags: string[];
};

/* =======================
   Utils
======================= */

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString();
}

/* =======================
   Component
======================= */

interface PastRaceUserSummaryProps {
  participant: Participant;
}

const PastRaceUserSummary: React.FC<PastRaceUserSummaryProps> = ({
  participant,
}) => {
  return (
    <div className="rounded-lg border-2 border-accent p-6 bg-background shadow-xl">
      <h2 className="text-xl font-bold font-mono mb-4 text-accent flex items-center gap-2">
        📊 Your Performance
        <span className="w-2 h-2 bg-accent animate-pulse inline-block"></span>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="WPM" value={participant.wpm} emoji="⚡" />
        <Stat label="Accuracy" value={`${participant.accuracy}%`} emoji="🎯" />
        <Stat
          label="Status"
          value={
            participant.disqualified
              ? "Disqualified"
              : participant.finished
                ? "Finished"
                : "—"
          }
          emoji={
            participant.disqualified ? "❌" : participant.finished ? "✅" : "⏳"
          }
          statusColor={
            participant.disqualified
              ? "text-incorrect"
              : participant.finished
                ? "text-correct"
                : "text-text"
          }
        />
        <Stat
          label="Finish Time"
          value={
            participant.finish_time ? formatDate(participant.finish_time) : "—"
          }
          emoji="🕐"
        />
      </div>

      {participant.cheat_flags.length > 0 && (
        <div className="mt-4 p-3 rounded-md bg-incorrect/20 border border-incorrect">
          <div className="text-sm font-mono font-semibold text-incorrect flex items-center gap-2">
            ⚠️ Cheat Flags:
            <span className="font-normal">
              {participant.cheat_flags.join(", ")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PastRaceUserSummary;

/* =======================
   Small Stat Component
======================= */

function Stat({
  label,
  value,
  emoji,
  statusColor,
}: {
  label: string;
  value: string | number;
  emoji?: string;
  statusColor?: string;
}) {
  return (
    <div className="rounded-md border-2 border-accent/50 p-3 text-center bg-background hover:border-accent hover:scale-105 transition-all shadow-md">
      <div className="text-xs font-mono text-text mb-1 flex items-center justify-center gap-1">
        {emoji && <span>{emoji}</span>}
        {label}
      </div>
      <div
        className={`text-lg font-bold font-mono ${statusColor || "text-accent"}`}
      >
        {value}
      </div>
    </div>
  );
}
