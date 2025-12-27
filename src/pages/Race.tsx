import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { socket } from "../socket";
import { useSocket } from "../hooks/useSocket";
import Header from "../components/Header";
import { calculateWPM } from "../utils/wpm";
import { calculateAccuracy } from "../utils/accuracy";
import { toast } from "react-hot-toast";

interface User {
  username: string;
  progress: number;
  finished: boolean;
  disqualified?: boolean;
  dqReason?: string;
  wpm?: number;
  accuracy?: number;
}

export default function Race() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as {
    roomId: string;
    text: string;
    users: Record<string, User>;
    username: string;
  };

  const { roomId, text, username } = state;

  const [typed, setTyped] = useState("");
  const [correctChars, setCorrectChars] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [users, setUsers] = useState<Record<string, User>>(state.users || {});
  const [finished, setFinished] = useState(false);
  const [disqualified, setDisqualified] = useState(false);

  /* -------------------- TIMER -------------------- */
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      setElapsedTime((Date.now() - start) / 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /* -------------------- SOCKET EVENTS -------------------- */

  // Live progress updates
  useSocket("progress-update", ({ socketId, progress }) => {
    setUsers((prev) => ({
      ...prev,
      [socketId]: { ...prev[socketId], progress },
    }));
  });

  // User disqualified (ANTI-CHEAT)
  useSocket("user-disqualified", ({ socketId, reason }) => {
    setUsers((prev) => ({
      ...prev,
      [socketId]: {
        ...prev[socketId],
        disqualified: true,
        finished: true,
        dqReason: reason,
      },
    }));

    // If THIS user is disqualified → block typing + show toast
    if (socketId === socket.id) {
      setDisqualified(true);
      toast.error(`Disqualified: ${reason}`, { duration: 5000 });
    }
  });

  // Race end (authoritative from backend)
  useSocket("race-ended", ({ results }) => {
    setFinished(true);
    navigate("/results", {
      state: { roomId, users: results, username },
    });
  });

  /* -------------------- TYPING HANDLER -------------------- */
  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (finished || disqualified) return;

    const value = e.target.value;
    setTyped(value);

    // Count correct chars from start
    let correct = 0;
    for (let i = 0; i < value.length && i < text.length; i++) {
      if (value[i] === text[i]) correct++;
      else break;
    }
    setCorrectChars(correct);

    // 🔥 SEND FULL typedText (REQUIRED FOR ANTI-CHEAT)
    socket.emit("typing-progress", {
      roomId,
      typedText: value,
    });
  };

  /* -------------------- LOCAL STATS (UI ONLY) -------------------- */
  const wpm = calculateWPM(correctChars, elapsedTime);
  const accuracy = calculateAccuracy(correctChars, typed.length);
  const progressPercent = Math.min(
    100,
    Math.round((correctChars / text.length) * 100)
  );

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header username={username} />

      <main className="flex flex-col items-center flex-1 p-6 gap-4">
        <h2 className="text-3xl font-bold">Race</h2>
        <p className="text-gray-600">Time: {Math.floor(elapsedTime)}s</p>

        {/* TEXT DISPLAY */}
        <div className="w-full max-w-3xl p-4 border rounded bg-white">
          <p className="mb-3 leading-relaxed">
            {text.split("").map((char, idx) => {
              const typedChar = typed[idx];
              return (
                <span
                  key={idx}
                  className={
                    idx < typed.length
                      ? typedChar === char
                        ? "text-green-500"
                        : "text-red-500"
                      : ""
                  }
                >
                  {char}
                </span>
              );
            })}
          </p>

          <textarea
            className="w-full border rounded p-2 text-lg"
            rows={3}
            value={typed}
            onChange={handleTyping}
            disabled={finished || disqualified}
            placeholder={
              disqualified ? "You are disqualified" : "Start typing..."
            }
          />
        </div>

        {/* STATS */}
        <div className="flex gap-6 mt-4">
          <p>
            WPM: <strong>{wpm}</strong>
          </p>
          <p>
            Accuracy: <strong>{accuracy}%</strong>
          </p>
          <p>
            Progress: <strong>{progressPercent}%</strong>
          </p>
        </div>

        {/* PLAYERS */}
        <div className="w-full max-w-md mt-6">
          {Object.entries(users).map(([id, user]) => (
            <div key={id} className="mb-3">
              <div className="flex justify-between">
                <span>{user.username}</span>
                {user.disqualified ? (
                  <span className="text-red-600 text-sm">
                    ❌ DQ {user.dqReason && `(${user.dqReason})`}
                  </span>
                ) : (
                  <span>{user.progress}%</span>
                )}
              </div>

              <div className="h-2 bg-gray-200 rounded mt-1">
                <div
                  className={`h-2 rounded ${
                    user.disqualified ? "bg-red-500" : "bg-blue-500"
                  }`}
                  style={{ width: `${user.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
