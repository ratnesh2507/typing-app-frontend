import React from "react";

/* =======================
   Types
======================= */

export type Participant = {
  user_id: string;
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
    <div className="rounded-lg border p-6 bg-background">
      <h2 className="text-lg font-semibold mb-4">Your Performance</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="WPM" value={participant.wpm} />
        <Stat label="Accuracy" value={`${participant.accuracy}%`} />
        <Stat
          label="Status"
          value={
            participant.disqualified
              ? "Disqualified"
              : participant.finished
                ? "Finished"
                : "—"
          }
        />
        <Stat
          label="Finish Time"
          value={
            participant.finish_time ? formatDate(participant.finish_time) : "—"
          }
        />
      </div>

      {participant.cheat_flags.length > 0 && (
        <div className="mt-4 text-sm text-red-500">
          Flags: {participant.cheat_flags.join(", ")}
        </div>
      )}
    </div>
  );
};

export default PastRaceUserSummary;

/* =======================
   Small Stat Component
======================= */

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md border p-3 text-center">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}
