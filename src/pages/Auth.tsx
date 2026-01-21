import { SignIn, SignUp, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate("/", { replace: true });
    }
  }, [isSignedIn, isLoaded, navigate]);

  // Show loading while Clerk initializes
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          <p className="text-accent font-mono">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-correct/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-incorrect/5 rounded-full blur-3xl"></div>

      {/* Header */}
      <div className="text-center mb-8 z-10">
        <h1 className="text-5xl font-bold font-mono text-accent mb-3 flex items-center justify-center gap-3">
          <span>⚡</span>
          RapidType
          <span>⚡</span>
        </h1>
        <p className="text-text font-mono text-lg">
          {showSignUp
            ? "Create your account to start racing"
            : "Welcome back, racer!"}
        </p>
      </div>

      {/* Auth Component */}
      <div className="z-10 rounded-2xl border-2 border-accent p-8 bg-background shadow-2xl">
        {showSignUp ? (
          <SignUp
            path="/auth"
            routing="path"
            signInUrl="/auth"
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "bg-background shadow-none",
                headerTitle: "text-accent font-mono",
                headerSubtitle: "text-text font-mono",
                socialButtonsBlockButton:
                  "border-accent/50 hover:border-accent text-accent font-mono",
                formButtonPrimary:
                  "bg-accent text-background hover:bg-accent/90 font-mono font-bold",
                footerActionLink: "text-accent hover:text-accent/80 font-mono",
                formFieldLabel: "text-text font-mono",
                formFieldInput:
                  "bg-background border-accent/50 text-accent focus:border-accent font-mono",
                identityPreviewText: "text-accent font-mono",
                identityPreviewEditButton:
                  "text-accent hover:text-accent/80 font-mono",
              },
            }}
          />
        ) : (
          <SignIn
            path="/auth"
            routing="path"
            signUpUrl="/auth"
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "bg-background shadow-none",
                headerTitle: "text-accent font-mono",
                headerSubtitle: "text-text font-mono",
                socialButtonsBlockButton:
                  "border-accent/50 hover:border-accent text-accent font-mono",
                formButtonPrimary:
                  "bg-accent text-background hover:bg-accent/90 font-mono font-bold",
                footerActionLink: "text-accent hover:text-accent/80 font-mono",
                formFieldLabel: "text-text font-mono",
                formFieldInput:
                  "bg-background border-accent/50 text-accent focus:border-accent font-mono",
                identityPreviewText: "text-accent font-mono",
                identityPreviewEditButton:
                  "text-accent hover:text-accent/80 font-mono",
              },
            }}
          />
        )}
      </div>

      {/* Toggle Button */}
      <button
        className="mt-6 px-6 py-3 bg-background border-2 border-accent text-accent font-mono font-semibold rounded-lg hover:bg-accent hover:text-background transition-all duration-200 hover:scale-105 shadow-lg z-10"
        onClick={() => setShowSignUp(!showSignUp)}
      >
        {showSignUp
          ? "Already have an account? Sign In →"
          : "Don't have an account? Sign Up →"}
      </button>

      {/* Footer */}
      <div className="mt-8 text-center text-text/70 font-mono text-sm z-10">
        <p>Race against players worldwide 🌍</p>
        <p className="mt-1">Improve your typing speed ⚡</p>
      </div>
    </div>
  );
}
