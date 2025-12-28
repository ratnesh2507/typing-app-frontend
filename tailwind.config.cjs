/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#1A1A2E", // Deep Navy
        text: "#6B728E", // Muted Gray
        correct: "#E94560", // Vibrant Pink/Red
        incorrect: "#00D1FF", // Electric Blue
        accent: "#FFEE63", // Cyber Yellow
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "monospace"], // Set default monospaced font
      },
    },
  },
  plugins: [],
};
