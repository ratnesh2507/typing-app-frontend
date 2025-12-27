import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  ClerkLoaded,
} from "@clerk/clerk-react";

import Dashboard from "./pages/Dashboard";
import Lobby from "./pages/Lobby";
import Race from "./pages/Race";
import Results from "./pages/Results";
import Auth from "./pages/Auth";

const clerkPublishableKey = import.meta.env
  .VITE_CLERK_PUBLISHABLE_KEY as string;

// Protected Route wrapper component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <Navigate to="/auth" replace />
      </SignedOut>
    </>
  );
}

function App() {
  console.log("Clerk Key:", clerkPublishableKey);

  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <ClerkLoaded>
        <Router>
          <Routes>
            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lobby"
              element={
                <ProtectedRoute>
                  <Lobby />
                </ProtectedRoute>
              }
            />
            <Route
              path="/race"
              element={
                <ProtectedRoute>
                  <Race />
                </ProtectedRoute>
              }
            />
            <Route
              path="/results"
              element={
                <ProtectedRoute>
                  <Results />
                </ProtectedRoute>
              }
            />

            {/* Auth routes - wildcard to handle Clerk's multi-step flows */}
            <Route
              path="/auth/*"
              element={
                <>
                  <SignedOut>
                    <Auth />
                  </SignedOut>
                  <SignedIn>
                    <Navigate to="/" replace />
                  </SignedIn>
                </>
              }
            />
          </Routes>
        </Router>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

export default App;
