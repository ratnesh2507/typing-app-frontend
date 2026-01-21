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
  const sortedRaces = [...races].sort((a, b) => {
    // 1. Sort by finishTime if both exist
    if (a.finishTime && b.finishTime) {
      return (
        new Date(b.finishTime).getTime() - new Date(a.finishTime).getTime()
      );
    }

    // 2. Fallback: Sort by raceId
    // Convert to String to prevent .localeCompare errors on numbers
    const idA = String(a.raceId || "");
    const idB = String(b.raceId || "");

    return idB.localeCompare(idA);
  });

  return (
    <section className="w-full max-w-3xl mt-8">
      <h2 className="text-3xl font-bold font-mono text-accent mb-6 flex items-center gap-3">
        <span>📜 Past Results</span>
        <span className="w-3 h-3 bg-accent animate-pulse block"></span>
      </h2>

      {sortedRaces.length === 0 ? (
        <div className="p-8 text-center rounded-xl border-2 border-accent bg-background shadow-xl">
          <div className="text-6xl mb-4">🏁</div>
          <p className="text-accent text-lg font-mono font-semibold mb-2">
            No past races yet
          </p>
          <p className="text-sm text-text font-mono">
            Complete a race to see your history here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-accent scrollbar-track-background">
          {sortedRaces.map((race) => (
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
