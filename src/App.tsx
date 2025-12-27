import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Lobby from "./pages/Lobby";
import Race from "./pages/Race";
import Results from "./pages/Results";
import Auth from "./pages/Auth";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing / Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Lobby page */}
        <Route path="/lobby" element={<Lobby />} />

        {/* Race page */}
        <Route path="/race" element={<Race />} />

        {/* Results page */}
        <Route path="/results" element={<Results />} />

        {/* Auth page */}
        <Route path="/auth" element={<Auth />} />

        {/* Fallback route */}
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
