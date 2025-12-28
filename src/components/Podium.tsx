interface PodiumProps {
  winners: {
    username: string;
    wpm: number;
  }[];
}

const podiumColors = ["bg-correct", "bg-accent", "bg-incorrect"]; // 1st, 2nd, 3rd

export default function Podium({ winners }: PodiumProps) {
  return (
    <div className="flex justify-center items-end gap-4 mt-6">
      {winners.map((player, index) => {
        const heightClass = ["h-40", "h-32", "h-24"][index]; // 1st tallest
        return (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-24 ${heightClass} rounded-t-lg shadow-lg ${podiumColors[index]} flex items-end justify-center transition-transform duration-300 hover:scale-105`}
            >
              <span className="text-background font-mono font-bold text-lg">
                {player.wpm} WPM
              </span>
            </div>
            <span className="mt-2 text-text font-mono font-semibold">
              {player.username}
            </span>
            <span className="text-sm text-text">
              {["🥇", "🥈", "🥉"][index]}
            </span>
          </div>
        );
      })}
    </div>
  );
}
