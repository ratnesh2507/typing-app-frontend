import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PlayerCard from "../components/PlayerCard";

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

  const state = location.state as {
    roomId: string;
    username: string;
    users: Record<string, User>;
  };

  const { users, username } = state;

  const userList = Object.values(users);

  const winner = [...userList]
    .filter((u) => !u.disqualified)
    .sort((a, b) => b.wpm - a.wpm)[0];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header username={username} />

      <main className="flex flex-col items-center flex-1 p-6 gap-6">
        <h2 className="text-3xl font-bold">Race Results</h2>

        {winner && (
          <div className="bg-yellow-100 p-4 rounded shadow w-full max-w-md text-center">
            🏆 Winner: <strong>{winner.username}</strong> ({winner.wpm} WPM)
          </div>
        )}

        <div className="flex flex-col gap-4 w-full max-w-md mt-4">
          {[...userList]
            .sort((a, b) => b.wpm - a.wpm)
            .map((user, idx) => (
              <PlayerCard
                key={idx}
                username={user.username}
                progress={user.progress}
                wpm={user.wpm}
                accuracy={user.accuracy}
                disqualified={user.disqualified}
                dqReason={user.dqReason}
              />
            ))}
        </div>

        <button
          className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          onClick={() => navigate("/")}
        >
          Back to Dashboard
        </button>
      </main>
    </div>
  );
}
