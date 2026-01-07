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
  glowColor,
}: {
  label: string;
  value: string | number;
  glowColor: string;
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center p-4 rounded-xl
                 bg-background border border-accent hover:scale-105 transition"
      style={{
        boxShadow: `0 0 18px ${glowColor}`,
      }}
    >
      <p className="text-sm text-text/70 font-mono">{label}</p>
      <p className="text-3xl font-bold font-mono text-accent mt-1">{value}</p>
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
      <h2 className="text-4xl font-bold font-mono text-accent mb-6">
        Your Stats
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Races Played" value={totalRaces} glowColor="#FFEE63" />

        <StatCard
          label="Races Finished"
          value={finishedRaces}
          glowColor="#E94560"
        />

        <StatCard label="Best WPM" value={bestWpm} glowColor="#00D1FF" />

        <StatCard
          label="Avg WPM"
          value={`${avgWpm.toFixed(1)}`}
          glowColor="#FFEE63"
        />

        {avgAccuracy !== undefined && (
          <StatCard
            label="Avg Accuracy"
            value={`${avgAccuracy.toFixed(1)}%`}
            glowColor="#00D1FF"
          />
        )}
      </div>
    </section>
  );
};

export default StatsHeader;
