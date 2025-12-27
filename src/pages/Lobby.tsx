import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { socket } from "../socket";
import { useSocket } from "../hooks/useSocket";
import Header from "../components/Header";
import PlayerCard from "../components/PlayerCard";

interface User {
  username: string;
  progress: number;
  finished: boolean;
}

export default function Lobby() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as {
    roomId: string;
    username: string;
    isHost: boolean;
  };

  const [roomId] = useState(state?.roomId || "");
  const [username] = useState(state?.username || "Guest");
  const [isHost] = useState(state?.isHost || false);
  const [users, setUsers] = useState<Record<string, User>>({});

  /* ===========================
     SOCKET LISTENERS
  ============================ */

  // Update players list when anyone joins/leaves
  useSocket("user-joined", ({ users }) => {
    setUsers(users);
  });

  // Navigate to Race when server starts the race
  useSocket("race-started", ({ text }) => {
    navigate("/race", {
      state: {
        roomId,
        text,
        users,
        username,
      },
    });
  });

  /* ===========================
     JOIN ROOM LOGIC (CRITICAL FIX)
  ============================ */

  useEffect(() => {
    if (!roomId || !username) return;

    // Host already joined via create-room
    // Non-host must explicitly join here
    if (!isHost) {
      socket.emit("join-room", { roomId, username });
    }
  }, [roomId, username, isHost]);

  /* ===========================
     ACTIONS
  ============================ */

  const handleStartRace = () => {
    if (!roomId) return;
    socket.emit("start-race", { roomId });
  };

  /* ===========================
     UI
  ============================ */

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header username={username} />

      <main className="flex flex-col items-center justify-start flex-1 gap-6 p-6">
        <h2 className="text-3xl font-bold">Lobby</h2>

        {roomId && (
          <p className="text-gray-600">
            Room ID: <span className="font-mono">{roomId}</span>
          </p>
        )}

        {/* Players List */}
        <div className="flex flex-col gap-2 w-full max-w-md mt-4">
          {Object.entries(users).map(([id, user]) => (
            <PlayerCard
              key={id}
              username={user.username}
              progress={user.progress}
              disqualified={false}
            />
          ))}
        </div>

        {/* Start Button */}
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
