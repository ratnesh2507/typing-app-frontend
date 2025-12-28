import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { socket } from "../socket";
import { useSocket } from "../hooks/useSocket";
import Header from "../components/Header";
import PlayerCard from "../components/PlayerCard";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

interface User {
  username: string;
  progress: number;
  finished: boolean;
  disqualified?: boolean;
}

export default function Lobby() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  const joinedRef = useRef(false);

  const state = location.state as
    | {
        roomId: string;
        isHost: boolean;
      }
    | undefined;

  /* ===========================
     GUARD: INVALID ENTRY
  ============================ */
  useEffect(() => {
    if (!state?.roomId) {
      navigate("/", { replace: true });
    }
  }, [state, navigate]);

  const roomId = state?.roomId || "";
  const isHost = state?.isHost || false;
  const username = user?.firstName || user?.username || "Guest";

  const [users, setUsers] = useState<Record<string, User>>({});

  /* ===========================
     SOCKET LISTENERS
  ============================ */

  // Someone joined
  useSocket("user-joined", ({ users }) => {
    setUsers(users);
  });

  // Join confirmed (safe for late joiners)
  useSocket("join-confirmed", ({ users }) => {
    setUsers(users);
  });

  // Someone left / disconnected
  useSocket("user-left", ({ users }) => {
    setUsers(users);
    toast("A player left the lobby", {
      icon: "👋",
      duration: 2000,
    });
  });

  // Race started
  useSocket("race-started", ({ text, users: serverUsers }) => {
    navigate("/race", {
      state: {
        roomId,
        text,
        users: serverUsers,
        username,
      },
    });
  });

  /* ===========================
     JOIN ROOM (ONCE)
  ============================ */
  useEffect(() => {
    if (!roomId || !username || joinedRef.current) return;

    joinedRef.current = true;
    socket.emit("join-room", { roomId, username });
  }, [roomId, username]);

  /* ===========================
     ACTIONS
  ============================ */
  const handleStartRace = () => {
    socket.emit("start-race", { roomId });
  };

  /* ===========================
     UI
  ============================ */
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header username={username} />

      <main className="flex flex-col items-center flex-1 gap-6 p-6">
        <h2 className="text-3xl font-bold">Lobby</h2>

        <p className="text-gray-600">
          Room ID: <span className="font-mono">{roomId}</span>
        </p>

        {/* Players */}
        <div className="flex flex-col gap-2 w-full max-w-md">
          {Object.entries(users).length === 0 && (
            <p className="text-center text-gray-500">
              Waiting for players to join...
            </p>
          )}

          {Object.entries(users).map(([id, user]) => (
            <PlayerCard
              key={id}
              username={user.username}
              progress={user.progress}
              disqualified={!!user.disqualified}
            />
          ))}
        </div>

        {/* Host only */}
        {isHost && (
          <button
            onClick={handleStartRace}
            className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Start Race
          </button>
        )}
      </main>
    </div>
  );
}
