import React from "react";

interface HeaderProps {
  username?: string;
}

const Header: React.FC<HeaderProps> = ({ username }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
      <h1 className="text-2xl font-bold">RapidType</h1>
      {username && <p className="text-gray-700">Hello, {username}</p>}
    </header>
  );
};

export default Header;
