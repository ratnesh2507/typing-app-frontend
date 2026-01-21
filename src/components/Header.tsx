import React from "react";
import { useNavigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignOutButton,
  SignInButton,
} from "@clerk/clerk-react";

interface HeaderProps {
  username?: string;
}

const Header: React.FC<HeaderProps> = ({ username }) => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between p-4 bg-background border-b border-accent shadow-lg">
      {/* Title */}
      <h1
        className="text-3xl font-bold font-mono text-accent cursor-pointer transition-colors duration-300 hover:text-correct"
        onClick={() => navigate("/")}
      >
        RapidType
      </h1>

      {/* Auth-controlled UI */}
      <SignedIn>
        <div className="flex items-center gap-4">
          <p className="font-mono text-text">Hello, {username ?? "Racer"}</p>

          <SignOutButton>
            <button className="px-4 py-2 rounded-lg bg-correct text-background font-mono transition-all duration-200 hover:brightness-110">
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </SignedIn>

      <SignedOut>
        <SignInButton>
          <button className="px-4 py-2 rounded-lg bg-accent text-background font-mono transition-all duration-200 hover:brightness-110">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
    </header>
  );
};

export default Header;
