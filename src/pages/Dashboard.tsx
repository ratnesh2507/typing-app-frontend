import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import { useUser } from "@clerk/clerk-react";
import Header from "../components/Header";
import HowToPlay from "../components/HowToPlay";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (user?.firstName) setUsername(user.firstName);
    else if (user?.username) setUsername(user.username);
  }, [user]);

  const handleCreateRoom = () => {
    if (!username.trim()) return alert("Username not available");

    socket.once("room-created", ({ roomId }) => {
      navigate("/lobby", {
        state: { roomId, username, isHost: true },
      });
    });

    socket.emit("create-room", { username });
  };

  const handleJoinRoom = () => {
    if (!username.trim()) return alert("Username not available");

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
    <div className="min-h-screen flex flex-col bg-background text-text font-mono">
      <Header username={username || "Guest"} />

      <main className="flex flex-col items-center justify-center flex-1 gap-8 p-6">
        <h1 className="text-6xl font-bold text-accent text-center">
          RapidType
        </h1>
        <p className="text-center text-accent/80 text-lg max-w-md">
          <em>
            Test your typing speed and accuracy against your friends in
            real-time.
          </em>
        </p>
        <HowToPlay />

        <div className="flex flex-col sm:flex-row gap-6 mt-8">
          <button
            className="bg-accent text-background px-8 py-4 rounded-lg font-semibold text-lg shadow-[0_0_20px_#FFEE63] hover:scale-105 hover:shadow-[0_0_25px_#FFEE63] transition-transform duration-200 cursor-pointer"
            onClick={handleCreateRoom}
          >
            Create Room
          </button>

          <button
            className="bg-correct text-background px-8 py-4 rounded-lg font-semibold text-lg shadow-[0_0_20px_#E94560] hover:scale-105 hover:shadow-[0_0_25px_#E94560] transition-transform duration-200 cursor-pointer"
            onClick={handleJoinRoom}
          >
            Join Room
          </button>
        </div>
      </main>
    </div>
  );
}
