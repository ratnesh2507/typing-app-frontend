import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import { useUser } from "@clerk/clerk-react";

import Header from "../components/Header";
import HowToPlay from "../components/HowToPlay";
import StatsHeader from "../components/StatsHeader";
import PastResults from "../components/PastResults";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();

  const [clerkId, setClerkId] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [stats, setStats] = useState<any>(null);
  const [pastRaces, setPastRaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- USER ID + DISPLAY NAME ---------------- */
  useEffect(() => {
    if (!isLoaded || !user) return;

    setClerkId(user.id);

    if (user.username) setUsername(user.username);
    else if (user.firstName) setUsername(user.firstName);
    else setUsername("Player");
  }, [isLoaded, user]);

  /* ---------------- SOCKET ACTIONS ---------------- */
  const handleCreateRoom = () => {
    if (!clerkId) return alert("User not authenticated");

    socket.once("room-created", ({ roomId }) => {
      navigate("/lobby", {
        state: { roomId, username, isHost: true },
      });
    });

    socket.emit("create-room", {
      clerkId,
      username,
    });
  };

  const handleJoinRoom = () => {
    if (!clerkId) return alert("User not authenticated");

    const roomId = prompt("Enter Room ID");
    if (!roomId) return;

    socket.once("join-confirmed", () => {
      navigate("/lobby", {
        state: { roomId, username, isHost: false },
      });
    });

    socket.emit("join-room", {
      roomId,
      clerkId,
      username,
    });
  };

  /* ---------------- FETCH DASHBOARD DATA ---------------- */
  useEffect(() => {
    if (!clerkId) return;

    async function fetchDashboardData() {
      try {
        setLoading(true);

        const res = await fetch(`${API_BASE}/users/${clerkId}/races?limit=20`);
        const races = await res.json();

        const finishedRaces = races.filter(
          (r: any) => r.finished && !r.disqualified,
        );

        const bestWpm = Math.max(...finishedRaces.map((r: any) => r.wpm), 0);

        const avgWpm =
          finishedRaces.length > 0
            ? finishedRaces.reduce((s: number, r: any) => s + r.wpm, 0) /
              finishedRaces.length
            : 0;

        const avgAccuracy =
          finishedRaces.length > 0
            ? finishedRaces.reduce((s: number, r: any) => s + r.accuracy, 0) /
              finishedRaces.length
            : 0;

        setStats({
          totalRaces: races.length,
          finishedRaces: finishedRaces.length,
          bestWpm,
          avgWpm,
          avgAccuracy,
        });

        setPastRaces(
          races.slice(0, 5).map((r: any) => ({
            raceId: r.race_id,
            wpm: r.wpm,
            accuracy: r.accuracy,
            finished: r.finished,
            disqualified: r.disqualified,
            finishTime: r.finish_time,
            cheatFlags: r.cheat_flags,
          })),
        );
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [clerkId]);

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen flex flex-col bg-background text-text font-mono">
      <Header username={username} />

      <main className="flex flex-col items-center flex-1 gap-10 p-6">
        <section className="flex flex-col items-center gap-4 mt-6">
          <h1 className="text-6xl font-bold text-accent">RapidType</h1>
          <p className="text-accent/80 text-lg text-center max-w-md">
            <em>Test your typing speed and accuracy against friends.</em>
          </p>
        </section>

        <HowToPlay />

        <div className="flex flex-col sm:flex-row gap-6">
          <button
            className="bg-accent text-background px-8 py-4 rounded-lg font-semibold
                       shadow-[0_0_20px_#FFEE63] hover:scale-105 transition-all"
            onClick={handleCreateRoom}
          >
            Create Room
          </button>

          <button
            className="bg-correct text-background px-8 py-4 rounded-lg font-semibold
                       shadow-[0_0_20px_#E94560] hover:scale-105 transition-all"
            onClick={handleJoinRoom}
          >
            Join Room
          </button>
        </div>

        {!loading && stats && <StatsHeader {...stats} />}

        {!loading && (
          <PastResults
            races={pastRaces}
            onSelectRace={(raceId) => navigate(`/races/${raceId}`)}
          />
        )}
      </main>
    </div>
  );
}
