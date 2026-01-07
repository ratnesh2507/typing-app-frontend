import React from "react";
import RaceResultCard from "./RaceResultCard";

interface PastRace {
  raceId: string;
  wpm: number;
  accuracy: number;
  finished: boolean;
  disqualified: boolean;
  finishTime?: number | null;
  cheatFlags?: string[];
}

interface PastResultsProps {
  races: PastRace[];
  onSelectRace?: (raceId: string) => void;
}

const PastResults: React.FC<PastResultsProps> = ({ races, onSelectRace }) => {
  return (
    <section className="w-full max-w-3xl mt-8">
      <h2 className="text-3xl font-bold font-mono text-accent mb-4">
        Past Results
      </h2>

      {/* Empty State */}
      {races.length === 0 ? (
        <div
          className="p-6 text-center rounded-xl border border-accent bg-background/40
                     shadow-[0_0_12px_#FFEE63]"
        >
          <p className="text-accent/80 text-lg">No past races yet 🏁</p>
          <p className="text-sm text-accent/60 mt-1">
            Complete a race to see your history here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-1">
          {races.map((race) => (
            <RaceResultCard
              key={race.raceId}
              raceId={race.raceId}
              wpm={race.wpm}
              accuracy={race.accuracy}
              finished={race.finished}
              disqualified={race.disqualified}
              finishTime={race.finishTime}
              cheatFlags={race.cheatFlags}
              onClick={() => onSelectRace?.(race.raceId)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default PastResults;
