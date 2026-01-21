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
      <div className="bg-background p-6 rounded-2xl max-w-md w-full shadow-xl border border-accent">
        <h2 className="text-2xl font-bold text-accent mb-4">What's New?</h2>
        <ul className="list-disc list-inside text-text/90 mb-4">
          <li>Users table now auto-updates on login.</li>
          <li>
            Leaderboards now track <code>clerk_id</code> correctly.
          </li>
          <li>
            Race page shows color instructions above typing area: Red = correct,
            Blue = incorrect.
          </li>
          <li>
            UI improvements and bug fixes across Dashboard and Race pages.
          </li>
        </ul>
        <button
          onClick={handleClose}
          className="mt-2 w-full py-2 bg-accent text-background font-bold rounded-lg hover:bg-accent/90 transition"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}
