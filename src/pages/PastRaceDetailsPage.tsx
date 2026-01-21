import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

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

  // ✅ SINGLE SOURCE OF TRUTH
  const currentUserClerkId = user?.id;

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
      <div className="p-6 text-center text-muted-foreground">
        Loading race details...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6 text-center text-red-500">
        {error ?? "Something went wrong"}
      </div>
    );
  }

  const { race, participants } = data;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <Link to="/" className="text-sm text-muted-foreground hover:underline">
        ← Back to Dashboard
      </Link>

      {/* Race Meta */}
      <div className="rounded-lg border p-4 bg-background">
        <div className="font-semibold">Race {race.room_id}</div>
        <div className="text-sm text-muted-foreground">
          {formatDate(race.started_at)} • Duration{" "}
          {getDuration(race.started_at, race.finished_at)} •{" "}
          {race.total_players} players
        </div>
      </div>

      {/* User Summary */}
      {userParticipant && <PastRaceUserSummary participant={userParticipant} />}

      {/* Leaderboard */}
      <PastRaceLeaderboard
        participants={participants}
        currentUserClerkId={currentUserClerkId}
      />
    </div>
  );
}
