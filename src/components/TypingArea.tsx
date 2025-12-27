import React from "react";

interface PodiumProps {
  winners: { username: string; wpm: number }[];
}

const Podium: React.FC<PodiumProps> = ({ winners }) => {
  return (
    <div className="flex justify-center gap-6 mt-8">
      {winners.map((w, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-lg font-bold">
            {i + 1}
          </div>
          <p className="mt-2">{w.username}</p>
          <p>{w.wpm} WPM</p>
        </div>
      ))}
    </div>
  );
};

export default Podium;
