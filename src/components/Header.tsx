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
    <header className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
      {/* Title */}
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        RapidType
      </h1>

      {/* User Info / Auth Buttons */}
      {username ? (
        <SignedIn>
          <div className="flex items-center gap-4">
            <p className="text-gray-700">Hello, {username}</p>
            <SignOutButton>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer transition">
                Sign Out
              </button>
            </SignOutButton>
          </div>
        </SignedIn>
      ) : (
        <SignedOut>
          <SignInButton>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer transition">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      )}
    </header>
  );
};

export default Header;
