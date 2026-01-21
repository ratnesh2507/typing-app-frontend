interface PodiumProps {
  winners: {
    username: string;
    wpm: number;
  }[];
  currentUsername?: string;
}

const podiumStyles = [
  {
    base: "bg-correct",
    glow: "shadow-[0_0_25px_rgba(233,69,96,0.8)]",
    ring: "ring-2 ring-correct",
  },
  {
    base: "bg-accent",
    glow: "shadow-[0_0_20px_rgba(255,238,99,0.8)]",
    ring: "ring-2 ring-accent",
  },
  {
    base: "bg-incorrect",
    glow: "shadow-[0_0_20px_rgba(0,209,255,0.8)]",
    ring: "ring-2 ring-incorrect",
  },
];

export default function Podium({ winners, currentUsername }: PodiumProps) {
  return (
    <div className="flex justify-center items-end gap-6 mt-8 mb-8">
      {winners.map((player, index) => {
        const heightClass = ["h-40", "h-32", "h-24"][index];
        const style = podiumStyles[index];
        const isCurrent = player.username === currentUsername;

        return (
          <div
            key={index}
            className="flex flex-col items-center opacity-0 animate-podium"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Podium Block */}
            <div
              className={`w-24 ${heightClass} rounded-t-xl ${style.base} ${
                style.glow
              } ${
                style.ring
              } flex items-end justify-center transition-transform duration-300 hover:scale-110 ${
                isCurrent
                  ? "ring-4 ring-accent shadow-[0_0_30px_rgba(255,238,99,1)]"
                  : ""
              }`}
            >
              <span className="mb-2 text-background font-mono font-bold text-lg">
                {player.wpm} WPM
              </span>
            </div>

            {/* Username */}
            <span
              className={`mt-3 font-mono font-semibold ${
                isCurrent ? "text-accent" : "text-text"
              }`}
            >
              {player.username}
              {isCurrent && " 👤"}
            </span>

            {/* Medal */}
            <span className="text-3xl mt-1">{["🥇", "🥈", "🥉"][index]}</span>
          </div>
        );
      })}
    </div>
  );
}
