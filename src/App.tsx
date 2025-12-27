import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";

import Dashboard from "./pages/Dashboard";
import Lobby from "./pages/Lobby";
import Race from "./pages/Race";
import Results from "./pages/Results";
import Auth from "./pages/Auth";

// Vite environment variable
const clerkPublishableKey = import.meta.env
  .VITE_CLERK_PUBLISHABLE_KEY as string;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <Router>
        <Routes>
          {/* Auth protected routes */}
          <Route
            path="/"
            element={
              <SignedIn>
                <Dashboard />
              </SignedIn>
            }
          />
          <Route
            path="/lobby"
            element={
              <SignedIn>
                <Lobby />
              </SignedIn>
            }
          />
          <Route
            path="/race"
            element={
              <SignedIn>
                <Race />
              </SignedIn>
            }
          />
          <Route
            path="/results"
            element={
              <SignedIn>
                <Results />
              </SignedIn>
            }
          />

          {/* Auth page */}
          <Route
            path="/auth"
            element={
              <SignedOut>
                <Auth />
              </SignedOut>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<RedirectToSignIn />} />
        </Routes>
      </Router>
    </ClerkProvider>
  );
}

export default App;
