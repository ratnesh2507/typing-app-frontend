import React from "react";
import type { Participant } from "./PastRaceUserSummary";

/* =======================
   Component
======================= */

interface PastRaceLeaderboardProps {
  participants: Participant[];
  currentUserClerkId?: string;
}

const PastRaceLeaderboard: React.FC<PastRaceLeaderboardProps> = ({
  participants,
  currentUserClerkId,
}) => {
  return (
    <div className="rounded-lg border-2 border-accent bg-background shadow-xl">
      <h2 className="text-xl font-bold font-mono p-4 border-b-2 border-accent text-accent">
        🏆 Leaderboard
      </h2>

      <div className="divide-y divide-accent/30">
        {participants.map((p, idx) => {
          const isYou = p.clerk_id === currentUserClerkId;
          const isTopThree = idx < 3;

          return (
            <div
              key={p.clerk_id}
              className={`p-4 flex items-center justify-between font-mono transition-all hover:bg-accent/10 ${
                isYou ? "bg-accent/20 border-l-4 border-accent" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                    isTopThree ? "bg-accent text-background" : "text-text"
                  }`}
                >
                  {idx === 0
                    ? "🥇"
                    : idx === 1
                      ? "🥈"
                      : idx === 2
                        ? "🥉"
                        : idx + 1}
                </div>
                <div>
                  <div className="font-semibold text-accent">
                    {p.username}{" "}
                    {isYou && <span className="text-correct">(You)</span>}
                  </div>
                  <div className="text-xs text-text">
                    {p.disqualified ? (
                      <span className="text-incorrect">❌ Disqualified</span>
                    ) : (
                      <span className="text-correct">✓ Finished</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-6 text-sm font-semibold">
                <div className="text-accent">
                  {p.wpm} <span className="text-text text-xs">WPM</span>
                </div>
                <div className="text-accent">
                  {p.accuracy}
                  <span className="text-text text-xs">% Accuracy</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PastRaceLeaderboard;
