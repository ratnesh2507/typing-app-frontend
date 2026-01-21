import React from "react";

interface StatsHeaderProps {
  totalRaces: number;
  finishedRaces: number;
  bestWpm: number;
  avgWpm: number;
  avgAccuracy?: number;
}

const StatCard = ({
  label,
  value,
  emoji,
  accentClass,
}: {
  label: string;
  value: string | number;
  emoji: string;
  accentClass: string;
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-5 rounded-xl
                 bg-background border-2 ${accentClass} 
                 hover:scale-105 hover:shadow-xl 
                 transition-all duration-300 shadow-lg`}
    >
      <div className="text-3xl mb-2">{emoji}</div>
      <p className="text-sm text-text font-mono">{label}</p>
      <p className="text-3xl font-bold font-mono text-accent mt-2">{value}</p>
    </div>
  );
};

const StatsHeader: React.FC<StatsHeaderProps> = ({
  totalRaces,
  finishedRaces,
  bestWpm,
  avgWpm,
  avgAccuracy,
}) => {
  return (
    <section className="w-full max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold font-mono text-accent mb-8 flex items-center gap-3">
        📈 Your Stats
        <span className="w-3 h-3 bg-accent animate-pulse block"></span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        <StatCard
          label="Races Played"
          value={totalRaces}
          emoji="🎮"
          accentClass="border-accent"
        />

        <StatCard
          label="Races Finished"
          value={finishedRaces}
          emoji="🏁"
          accentClass="border-correct"
        />

        <StatCard
          label="Best WPM"
          value={bestWpm}
          emoji="🚀"
          accentClass="border-incorrect"
        />

        <StatCard
          label="Avg WPM"
          value={`${avgWpm.toFixed(1)}`}
          emoji="⚡"
          accentClass="border-accent"
        />

        {avgAccuracy !== undefined && (
          <StatCard
            label="Avg Accuracy"
            value={`${avgAccuracy.toFixed(1)}%`}
            emoji="🎯"
            accentClass="border-incorrect"
          />
        )}
      </div>
    </section>
  );
};

export default StatsHeader;
