import { createContext, use } from "react";

export const CharactersContext = createContext(undefined);

export const useCharactersContext = () => {
  const context = use(CharactersContext);
  if (!context) {
    throw new Error("useCharactersContext must be used within a CharactersProvider");
  }
  return context;
};
