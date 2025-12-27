import { SignIn, SignUp, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Auth() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // Optional: redirect back to previous page if any
  const from = (location.state as { from?: string })?.from || "/";

  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      navigate(from, { replace: true }); // Redirect to dashboard
    }
  }, [isSignedIn, navigate, from]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      {showSignUp ? (
        <SignUp
          path="/auth"
          routing="path"
          signInUrl="/auth"
          afterSignUpUrl="/"
        />
      ) : (
        <SignIn
          path="/auth"
          routing="path"
          signUpUrl="/auth"
          afterSignInUrl="/"
        />
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
