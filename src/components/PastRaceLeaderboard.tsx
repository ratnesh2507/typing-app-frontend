import React from "react";
import type { Participant } from "./PastRaceUserSummary";

/* =======================
   Component
======================= */

interface PastRaceLeaderboardProps {
  participants: Participant[];
  currentUserId?: string;
}

const PastRaceLeaderboard: React.FC<PastRaceLeaderboardProps> = ({
  participants,
  currentUserId,
}) => {
  return (
    <div className="rounded-lg border bg-background">
      <h2 className="text-lg font-semibold p-4 border-b">Leaderboard</h2>

      <div className="divide-y">
        {participants.map((p, idx) => {
          const isYou = p.user_id === currentUserId;

          return (
            <div
              key={p.user_id}
              className={`p-4 flex items-center justify-between ${
                isYou ? "bg-accent/20" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 text-muted-foreground">{idx + 1}</div>
                <div>
                  <div className="font-medium">
                    {p.user_id} {isYou && "(You)"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {p.disqualified ? "Disqualified" : "Finished"}
                  </div>
                </div>
              </div>

              <div className="flex gap-6 text-sm">
                <div>{p.wpm} WPM</div>
                <div>{p.accuracy}%</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PastRaceLeaderboard;
