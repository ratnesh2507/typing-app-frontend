import RaceResultCard from "./RaceResultCard";

export interface PastRace {
  raceId: string;
  wpm: number;
  accuracy: number;
  finished: boolean;
  disqualified: boolean;
  finishTime?: string | null;
  cheatFlags?: string[];
}

interface PastResultsProps {
  races: PastRace[];
  onSelectRace?: (raceId: string) => void;
}

export default function PastResults({ races, onSelectRace }: PastResultsProps) {
  return (
    <section className="w-full max-w-3xl mt-8">
      <h2 className="text-3xl font-bold text-accent mb-4">Past Results</h2>

      {races.length === 0 ? (
        <div className="p-6 text-center rounded-xl border border-accent/40 bg-background/40">
          <p className="text-accent/80 text-lg">No past races yet 🏁</p>
          <p className="text-sm text-accent/60 mt-1">
            Complete a race to see your history here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
          {races.map((race) => (
            <RaceResultCard
              key={race.raceId}
              {...race}
              onClick={() => onSelectRace?.(race.raceId)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
