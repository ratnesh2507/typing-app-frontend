import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PlayerCard from "../components/PlayerCard";
import Podium from "../components/Podium";
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

  useEffect(() => {
    if (!state) navigate("/", { replace: true });
  }, [state, navigate]);

  if (!state) return null;

  const username = user?.firstName || user?.username || "Guest";
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

  return (
    <>
      <SignedIn>
        <div className="min-h-screen flex flex-col bg-background text-text">
          <Header username={username} />

          <main className="flex flex-col items-center flex-1 p-6 gap-8">
            <h2 className="text-4xl font-bold font-mono tracking-wide">
              Race Results
            </h2>

            {/* 🏆 Podium */}
            {podiumWinners.length > 0 ? (
              <Podium winners={podiumWinners} />
            ) : (
              <p className="text-gray-500 mt-4">
                No valid finishers in this race.
              </p>
            )}

            {/* Divider */}
            <div className="w-full max-w-md h-px bg-gray-700 my-4" />

            {/* Players List */}
            <div className="w-full max-w-md flex flex-col gap-3">
              {sortedPlayers.map((player, index) => (
                <PlayerCard
                  key={index}
                  username={player.username}
                  progress={player.progress}
                  wpm={player.wpm}
                  accuracy={player.accuracy}
                  disqualified={player.disqualified}
                  dqReason={player.dqReason}
                />
              ))}
            </div>

            {/* Actions */}
            <button
              onClick={() => navigate("/")}
              className="
                mt-6
                px-8
                py-3
                rounded-lg
                font-mono
                font-semibold
                bg-accent
                text-background
                shadow-lg
                hover:shadow-xl
                hover:scale-105
                transition-all
                duration-200
              "
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
