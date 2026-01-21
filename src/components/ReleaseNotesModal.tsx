import { useState, useEffect } from "react";

interface ReleaseNotesModalProps {
  version: string;
}

export default function ReleaseNotesModal({ version }: ReleaseNotesModalProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(`seenReleaseNotes_${version}`);
    if (!seen) setOpen(true);
  }, [version]);

  const handleClose = () => {
    localStorage.setItem(`seenReleaseNotes_${version}`, "true");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-background p-6 rounded-2xl w-11/12 max-w-4xl shadow-xl border border-accent">
        <h2 className="text-2xl font-bold text-accent mb-4 text-center">
          🚀 Rapid Type Challenge v1.1.0 – What's New? ✨
        </h2>

        <div className="flex flex-col sm:flex-row gap-8">
          <div className="flex-1">
            <h3 className="font-semibold text-accent mb-2">🆕 New Features</h3>
            <ul className="list-disc list-inside text-text/90 mb-4">
              <li>
                👤 User auto-sync: racers now automatically add/update in the{" "}
                <code>users</code> table on login.
              </li>
              <li>
                🏆 Leaderboards now track <code>clerk_id</code> correctly for
                global, weekly, and per-race stats.
              </li>
              <li>
                🎨 Color-coded typing feedback:{" "}
                <span className="text-correct font-semibold">Red</span> =
                correct,{" "}
                <span className="text-incorrect font-semibold">Blue</span> =
                incorrect.
              </li>
              <li>
                📝 Release Notes modal on Dashboard (shown once per user per
                version).
              </li>
              <li>
                📊 Dashboard improvements: real-time WPM, Accuracy, and past
                races auto-sync.
              </li>
            </ul>
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-accent mb-2">
              ⚡ Improvements & 🐞 Bug Fixes
            </h3>
            <ul className="list-disc list-inside text-text/90 mb-4">
              <li>
                ⚡ Faster race progress updates and smoother text rendering.
              </li>
              <li>📱 Minor UI tweaks for mobile and desktop responsiveness.</li>
              <li>
                🛠️ Backend endpoints refactored for leaderboards and user stats.
              </li>
              <li>✅ Fixed race participants insertion issue for new users.</li>
              <li>
                🏅 Corrected leaderboard inconsistencies from previous{" "}
                <code>user_id</code> usage.
              </li>
              <li>🖋️ Minor race display glitches fixed for long texts.</li>
            </ul>
          </div>
        </div>

        <button
          onClick={handleClose}
          className="mt-4 w-full sm:w-auto py-2 px-6 bg-accent text-background font-bold rounded-lg hover:bg-accent/90 transition self-center"
        >
          👍 Got it!
        </button>
      </div>
    </div>
  );
}
