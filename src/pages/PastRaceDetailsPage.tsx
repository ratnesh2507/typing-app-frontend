import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import Header from "../components/Header";
import PastRaceUserSummary, {
  type Participant,
} from "../components/PastRaceUserSummary";
import PastRaceLeaderboard from "../components/PastRaceLeaderboard";

/* =======================
   Types
======================= */

type Race = {
  id: number;
  room_id: string;
  text: string;
  started_at: string;
  finished_at: string;
  total_players: number;
};

type RaceDetailsResponse = {
  race: Race;
  participants: Participant[];
};

/* =======================
   Utils
======================= */

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString();
}

function getDuration(start: string, end: string) {
  const diff = new Date(end).getTime() - new Date(start).getTime();
  return `${Math.round(diff / 1000)}s`;
}

/* =======================
   Page
======================= */

export default function PastRaceDetailsPage() {
  const { raceId } = useParams<{ raceId: string }>();
  const { user, isLoaded } = useUser();

  const [data, setData] = useState<RaceDetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentUserClerkId = user?.id;
  const displayName = user?.username || user?.firstName || "Guest";

  useEffect(() => {
    if (!raceId) return;

    async function fetchRaceDetails() {
      try {
        setLoading(true);
        const API_BASE =
          import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

        const res = await fetch(`${API_BASE}/races/${raceId}/details`);
        if (!res.ok) throw new Error("Failed to fetch race details");

        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRaceDetails();
  }, [raceId]);

  const userParticipant = useMemo(() => {
    if (!data || !currentUserClerkId) return null;

    return (
      data.participants.find((p) => p.clerk_id === currentUserClerkId) ?? null
    );
  }, [data, currentUserClerkId]);

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-text">
        <Header username={displayName} />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-accent/60 text-lg font-mono">
            Loading race details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-text">
        <Header username={displayName} />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-incorrect text-lg font-mono">
            {error ?? "Something went wrong"}
          </p>
        </div>
      </div>
    );
  }

  const { race, participants } = data;

  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      <Header username={displayName} />

      <main className="max-w-5xl mx-auto p-6 flex flex-col gap-6 flex-1">
        <Link
          to="/"
          className="text-sm text-accent hover:text-correct transition-colors font-mono"
        >
          ← Back to Dashboard
        </Link>

        {/* Race Meta */}
        <div className="rounded-lg border-2 border-accent p-4 bg-background shadow-lg">
          <div className="font-semibold font-mono text-accent text-lg">
            Race {race.room_id}
          </div>
          <div className="text-sm text-text/80 font-mono">
            {formatDate(race.started_at)} • Duration{" "}
            {getDuration(race.started_at, race.finished_at)} •{" "}
            {race.total_players} players
          </div>
        </div>

        {/* Race Text Display */}
        <div className="rounded-lg border-2 border-accent/50 p-4 bg-background/50 shadow-lg">
          <h3 className="text-accent font-mono font-semibold mb-2 text-lg">
            📝 Race Text
          </h3>
          <p className="text-text text-sm font-mono leading-relaxed">
            {race.text}
          </p>
        </div>

        {/* User Summary */}
        {userParticipant && (
          <PastRaceUserSummary participant={userParticipant} />
        )}

        {/* Leaderboard */}
        <PastRaceLeaderboard
          participants={participants}
          currentUserClerkId={currentUserClerkId}
        />
      </main>
    </div>
  );
}
