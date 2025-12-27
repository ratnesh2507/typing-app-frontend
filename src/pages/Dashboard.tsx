import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import Header from "../components/Header";

export default function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleCreateRoom = () => {
    if (!username.trim()) return alert("Enter a username");

    socket.once("room-created", ({ roomId }) => {
      navigate("/lobby", {
        state: { roomId, username, isHost: true },
      });
    });

    socket.emit("create-room", { username });
  };

  const handleJoinRoom = () => {
    if (!username.trim()) return alert("Enter a username");

    const roomId = prompt("Enter Room ID");
    if (!roomId) return;

    socket.once("join-confirmed", () => {
      navigate("/lobby", {
        state: { roomId, username, isHost: false },
      });
    });

    socket.emit("join-room", { roomId, username });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header username={username || "Guest"} />

      <main className="flex flex-col items-center justify-center flex-1 gap-6 p-6">
        <h1 className="text-5xl font-bold text-center">Typing Battle</h1>

        <input
          type="text"
          placeholder="Enter username"
          className="border p-2 rounded w-64 text-lg"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg"
            onClick={handleCreateRoom}
          >
            Create Room
          </button>

          <button
            className="bg-green-500 text-white px-6 py-3 rounded-lg"
            onClick={handleJoinRoom}
          >
            Join Room
          </button>
        </div>
      </main>
    </div>
  );
}
