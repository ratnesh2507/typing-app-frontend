import { useState, useRef, useEffect } from "react";

export default function HowToPlay() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-[#FFEE63] text-[#1A1A2E] font-mono font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all hover:cursor-pointer duration-200"
      >
        🎮 How To Play
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          {/* Modal Content */}
          <div
            ref={modalRef}
            className="bg-[#1A1A2E] text-[#FFEE63] rounded-2xl p-6 max-w-lg w-full relative shadow-2xl border-4 border-[#FFEE63] flex flex-col gap-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-[#FFEE63] font-bold text-xl hover:text-red-500 transition-colors"
            >
              ✖️
            </button>

            {/* Heading with Pixel Cursor */}
            <h2 className="text-2xl font-bold font-mono text-center mb-2 flex items-center justify-center gap-2">
              🕹️ How To Play 🕹️
              <span className="w-3 h-3 bg-[#FFEE63] animate-pulse block"></span>
            </h2>

            <ul className="list-disc list-inside font-mono text-sm space-y-2">
              <li>
                Type the displayed text as fast and accurately as possible. ⌨️
              </li>
              <li>Each race has a max of 30 words per text. 📝</li>
              <li>
                Do NOT paste text or jump ahead – cheats will be disqualified.
                ❌
              </li>
              <li>Maximum allowed WPM: 220. 🚀</li>
              <li>Finish too quickly and you may get disqualified. ⏱️</li>
              <li>
                Score is based on <strong>WPM</strong> &{" "}
                <strong>Accuracy</strong>. 🎯
              </li>
              <li>
                Join a room, wait for others, start the race, and see the
                results at the end! 🏁
              </li>
            </ul>

            <p className="text-center font-mono mt-2">
              Good luck & have fun! 🎉
              <span className="w-2 h-2 bg-[#FFEE63] inline-block ml-1 animate-pulse"></span>
            </p>

            {/* Credit */}
            <p className="text-center font-mono text-md mt-4 text-[#FFEE63]/70">
              Made with ❤️ by BVK Ratnesh |{" "}
              <a
                href="https://github.com/ratnesh2507"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                GitHub
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
