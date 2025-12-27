import { SignIn, SignUp, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Auth() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string })?.from || "/";
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      navigate(from, { replace: true });
    }
  }, [isSignedIn, navigate, from]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      {showSignUp ? (
        <SignUp path="/auth" routing="path" signInUrl="/auth" />
      ) : (
        <SignIn path="/auth" routing="path" signUpUrl="/auth" />
      )}

      <button
        className="mt-4 text-blue-500 underline"
        onClick={() => setShowSignUp(!showSignUp)}
      >
        {showSignUp
          ? "Already have an account? Sign In"
          : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
}
