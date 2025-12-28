interface PodiumProps {
  winners: {
    username: string;
    wpm: number;
  }[];
}

const podiumStyles = [
  {
    base: "bg-correct",
    glow: "shadow-[0_0_25px_#E94560]",
    ring: "ring-2 ring-[#E94560]",
  },
  {
    base: "bg-accent",
    glow: "shadow-[0_0_20px_#FFEE63]",
    ring: "ring-2 ring-[#FFEE63]",
  },
  {
    base: "bg-incorrect",
    glow: "shadow-[0_0_20px_#00D1FF]",
    ring: "ring-2 ring-[#00D1FF]",
  },
];

export default function Podium({ winners }: PodiumProps) {
  return (
    <div className="flex justify-center items-end gap-6 mt-8">
      {winners.map((player, index) => {
        const heightClass = ["h-40", "h-32", "h-24"][index];
        const style = podiumStyles[index];

        return (
          <div
            key={index}
            className="flex flex-col items-center opacity-0 animate-podium"
            style={{
              animationDelay: `${index * 150}ms`,
            }}
          >
            <div
              className={`
                w-24
                ${heightClass}
                rounded-t-xl
                ${style.base}
                ${style.glow}
                ${style.ring}
                flex items-end justify-center
                transition-transform
                duration-300
                hover:scale-110
              `}
            >
              <span className="mb-2 text-background font-mono font-bold text-lg">
                {player.wpm} WPM
              </span>
            </div>

            <span className="mt-3 text-text font-mono font-semibold">
              {player.username}
            </span>

            <span className="text-xl">{["🥇", "🥈", "🥉"][index]}</span>
          </div>
        );
      })}
    </div>
  );
}
