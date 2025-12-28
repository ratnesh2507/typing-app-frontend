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
    <header className="flex justify-between items-center p-4 bg-background shadow-lg border-b border-accent">
      {/* Title */}
      <h1
        className="text-3xl font-bold font-mono text-accent cursor-pointer hover:text-correct transition-colors duration-300"
        onClick={() => navigate("/")}
      >
        RapidType
      </h1>

      {/* User Info / Auth Buttons */}
      {username ? (
        <SignedIn>
          <div className="flex items-center gap-4">
            <p className="text-text font-mono">Hello, {username}</p>
            <SignOutButton>
              <button className="bg-correct text-background px-4 py-2 rounded-lg hover:brightness-125 transition-all duration-200">
                Sign Out
              </button>
            </SignOutButton>
          </div>
        </SignedIn>
      ) : (
        <SignedOut>
          <SignInButton>
            <button className="bg-accent text-background px-4 py-2 rounded-lg hover:brightness-125 transition-all duration-200">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      )}
    </header>
  );
};

export default Header;
