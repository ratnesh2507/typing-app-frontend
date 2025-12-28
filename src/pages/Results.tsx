import { useEffect, useMemo, useState } from "react";
import Confetti from "react-confetti";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PlayerCard from "../components/PlayerCard";
import Podium from "../components/Podium";
import RaceSummaryCard from "../components/RaceSummaryCard";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useUser,
} from "@clerk/clerk-react";

interface User {
  username: string;
  progress: number;
  wpm: number;
  accuracy: number;
  finished: boolean;
  disqualified?: boolean;
  dqReason?: string;
}

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  const state = location.state as {
    roomId: string;
    users: Record<string, User>;
  } | null;

  const [showConfetti, setShowConfetti] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  /* -------------------- GUARD -------------------- */
  useEffect(() => {
    if (!state) navigate("/", { replace: true });
  }, [state, navigate]);

  if (!state) return null;

  const currentUsername = user?.firstName || user?.username || "Guest";
  const userList = Object.values(state.users);

  /* -------------------- PODIUM DATA -------------------- */
  const podiumWinners = useMemo(
    () =>
      [...userList]
        .filter((u) => !u.disqualified)
        .sort((a, b) => b.wpm - a.wpm)
        .slice(0, 3)
        .map((u) => ({ username: u.username, wpm: u.wpm })),
    [userList]
  );

  /* -------------------- SORTED PLAYERS -------------------- */
  const sortedPlayers = useMemo(
    () => [...userList].sort((a, b) => b.wpm - a.wpm),
    [userList]
  );

  /* -------------------- CONFETTI -------------------- */
  useEffect(() => {
    if (podiumWinners.length > 0) {
      setShowConfetti(true);
      const timeout = setTimeout(() => setShowConfetti(false), 2500);
      return () => clearTimeout(timeout);
    }
  }, [podiumWinners]);

  /* -------------------- WINDOW RESIZE -------------------- */
  useEffect(() => {
    const handleResize = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <SignedIn>
        {/* 🎉 Confetti */}
        {showConfetti && (
          <Confetti
            width={dimensions.width}
            height={dimensions.height}
            numberOfPieces={200}
            gravity={0.35}
            recycle={false}
            colors={["#E94560", "#FFEE63", "#00D1FF"]}
          />
        )}

        <div className="w-screen h-screen flex flex-col bg-background text-text overflow-hidden">
          <Header username={currentUsername} />

          <main className="flex flex-col items-center p-6 gap-8 w-full overflow-y-auto">
            {/* Title */}
            <h2 className="text-4xl font-bold font-mono tracking-wide">
              Race Results
            </h2>

            {/* 🏆 Podium */}
            {podiumWinners.length > 0 ? (
              <Podium
                winners={podiumWinners}
                currentUsername={currentUsername}
              />
            ) : (
              <p className="text-gray-500 mt-4">
                No valid finishers in this race.
              </p>
            )}

            {/* Two-column layout */}
            <div className="w-full flex gap-4 mt-6 justify-center">
              {/* Left Column - Race Summary */}
              <div className="w-full max-w-sm shrink-0">
                <RaceSummaryCard users={userList} />
              </div>

              {/* Right Column - Players List */}
              <div className="w-full max-w-md flex flex-col gap-3 max-h-[70vh] overflow-y-auto">
                <h2 className="text-4xl font-bold font-mono tracking-wide">
                  Players List
                </h2>
                {sortedPlayers.map((player, index) => (
                  <PlayerCard
                    key={index}
                    username={player.username}
                    progress={player.progress}
                    wpm={player.wpm}
                    accuracy={player.accuracy}
                    disqualified={player.disqualified}
                    dqReason={player.dqReason}
                    highlight={player.username === currentUsername}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 rounded-lg font-mono shadow-[0_0_20px_#E94560] font-semibold bg-accent text-background hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              Back to Dashboard
            </button>
          </main>
        </div>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
