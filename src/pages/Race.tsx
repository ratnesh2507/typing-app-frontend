import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { socket } from "../socket";
import { useSocket } from "../hooks/useSocket";
import Header from "../components/Header";
import PlayerCard from "../components/PlayerCard";
import TypingArea from "../components/TypingArea";
import { calculateWPM } from "../utils/wpm";
// import { calculateAccuracy } from "../utils/accuracy";
import { toast } from "react-hot-toast";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useUser,
} from "@clerk/clerk-react";

interface User {
  username: string;
  progress: number;
  finished: boolean;
  disqualified?: boolean;
  dqReason?: string;
  wpm?: number;
  accuracy?: number;
}

interface RaceState {
  roomId: string;
}

export default function Race() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  const state = location.state as RaceState | null;
  const roomId = state?.roomId;

  /* -------------------- SAFETY GUARD -------------------- */
  useEffect(() => {
    if (!roomId) navigate("/", { replace: true });
  }, [roomId, navigate]);

  const username = user?.firstName || user?.username || "Guest";

  /* -------------------- STATE -------------------- */
  const [text, setText] = useState("");
  const [typed, setTyped] = useState("");
  const [correctChars, setCorrectChars] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [users, setUsers] = useState<Record<string, User>>({});
  const [disqualified, setDisqualified] = useState(false);
  // const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* -------------------- SYNC RACE ON LOAD -------------------- */
  useEffect(() => {
    if (!roomId) return;
    socket.emit("sync-race-state", { roomId });
  }, [roomId]);

  useSocket("race-state", ({ status, text, startTime, users, results }) => {
    setUsers(users);
    setText(text);

    if (status === "finished" && results) {
      navigate("/results", {
        state: { roomId, users: results, username },
      });
      return;
    }

    if (status === "running" && startTime) {
      setStartTime(startTime);
    }
  });

  /* -------------------- TIMER -------------------- */
  useEffect(() => {
    if (!startTime || disqualified) return;
    if (timerRef.current) return; // prevent multiple intervals

    timerRef.current = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [startTime, disqualified]);

  /* -------------------- SOCKET EVENTS -------------------- */
  useSocket("progress-update", ({ socketId, progress, wpm, accuracy }) => {
    setUsers((prev) =>
      prev[socketId]
        ? {
            ...prev,
            [socketId]: {
              ...prev[socketId],
              progress,
              wpm,
              accuracy,
            },
          }
        : prev
    );
  });

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

    if (socketId === socket.id) {
      setDisqualified(true);
      toast.error(`Disqualified: ${reason}`);
    }
  });

  useSocket("race-ended", ({ results }) => {
    navigate("/results", {
      state: { roomId, users: results, username },
    });
  });

  /* -------------------- TYPING -------------------- */
  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (disqualified) return;

    const value = e.target.value;
    setTyped(value);

    // Count correct chars in correct positions
    let correct = 0;
    for (let i = 0; i < Math.min(value.length, text.length); i++) {
      if (value[i] === text[i]) correct++;
    }
    setCorrectChars(correct);

    socket.emit("typing-progress", {
      roomId,
      typedText: value,
    });

    // // Finish detection
    // if (!finished && correct === text.length) {
    //   setFinished(true);

    //   socket.emit("user-finished", {
    //     roomId,
    //     wpm: calculateWPM(correct, elapsedTime),
    //     accuracy: calculateAccuracy(correct, value.length),
    //   });
    // }
  };

  /* -------------------- STATS -------------------- */
  const stats = useMemo(() => {
    const progress = text.length
      ? Math.min(100, Math.round((correctChars / text.length) * 100))
      : 0;
    const accuracy = typed.length
      ? Math.round((correctChars / typed.length) * 100)
      : 100;
    const wpm = elapsedTime > 0 ? calculateWPM(correctChars, elapsedTime) : 0;
    return { progress, accuracy, wpm };
  }, [correctChars, typed.length, text.length, elapsedTime]);

  /* -------------------- UI -------------------- */
  return (
    <>
      <SignedIn>
        <div className="min-h-screen flex flex-col bg-background text-text">
          <Header username={username} />

          <main className="flex flex-col items-center flex-1 p-6 gap-4">
            <h2 className="text-3xl font-bold">Race</h2>
            <p className="text-gray-600">Time: {elapsedTime}s</p>

            <div className="w-full max-w-3xl p-4 border rounded bg-background">
              {/* Typing Text */}
              <p className="mb-3 leading-relaxed text-lg">
                {text.split("").map((char, idx) => {
                  const typedChar = typed[idx];
                  const color =
                    idx < typed.length
                      ? typedChar === char
                        ? "#E94560" // correct
                        : "#00D1FF" // incorrect
                      : "#6B728E"; // default gray
                  return (
                    <span key={idx} style={{ color }}>
                      {char}
                    </span>
                  );
                })}
              </p>

              {/* Textarea */}
              <TypingArea
                typed={typed}
                handleTyping={handleTyping}
                disqualified={disqualified}
              />
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              <p>
                WPM: <strong>{stats.wpm}</strong>
              </p>
              <p>
                Accuracy: <strong>{stats.accuracy}%</strong>
              </p>
              <p>
                Progress: <strong>{stats.progress}%</strong>
              </p>
            </div>

            {/* Players */}
            <div className="w-full max-w-md mt-6 flex flex-col gap-2">
              {Object.entries(users).map(([id, user]) => (
                <PlayerCard
                  key={id}
                  username={user.username}
                  progress={user.progress}
                  wpm={user.wpm ?? 0}
                  accuracy={user.accuracy ?? 0}
                  disqualified={user.disqualified}
                  dqReason={user.dqReason}
                />
              ))}
            </div>
          </main>
        </div>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
