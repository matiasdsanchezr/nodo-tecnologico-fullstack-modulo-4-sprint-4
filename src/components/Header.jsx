import React from "react";

export const Header = ({
  title = "Rick and Morty API",
  className = "",
  onShowFavorites,
}) => {
  return (
    <header
      className={`bg-gradient-to-r from-green-400 to-blue-500 dark:from-gray-800 dark:to-gray-900 shadow-lg py-5 px-6 flex items-center justify-center text-white ${className}`}
    >
      <div className="w-full max-w-6xl flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="font-['Orbitron'] text-3xl font-bold tracking-tighter text-white drop-shadow-md">
            {title}
            <span className="text-yellow-300 dark:text-accent-teal animate-pulse">.</span>
          </h1>
        </div>
        <button type="button" onClick={onShowFavorites} className="hover:text-indigo-600">
          Favoritos
        </button>
      </div>
    </header>
  );
};
