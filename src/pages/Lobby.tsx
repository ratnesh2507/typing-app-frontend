import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import { useSocket } from "../hooks/useSocket";
import Header from "../components/Header";
import PlayerCard from "../components/PlayerCard";
import { useUser } from "@clerk/clerk-react";

interface User {
  username: string;
  progress: number;
  finished: boolean;
  disqualified?: boolean;
}

export default function Lobby() {
  const navigate = useNavigate();
  const { user } = useUser(); // Get authenticated user
  const [roomId, setRoomId] = useState("");
  const [isHost, setIsHost] = useState(false);
  const [users, setUsers] = useState<Record<string, User>>({});

  const username = user?.firstName || user?.username || "Guest";

  /* ===========================
     SOCKET LISTENERS
  ============================ */

  useSocket("user-joined", ({ users }) => {
    setUsers(users);
  });

  useSocket("join-confirmed", ({ users }) => {
    setUsers(users);
  });

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
     JOIN ROOM LOGIC
  ============================ */

  useEffect(() => {
    if (!roomId || !username) return;

    // Non-host joins room automatically if roomId is set
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
              disqualified={user.disqualified || false}
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
