import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

function ClientOnlyApp() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return <App />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClientOnlyApp />
  </StrictMode>
);
