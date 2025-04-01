import { useMemo } from "react";
import { useRickAndMorty } from "../../hooks/useRickAndMorty";
import { useFavorites } from "../../hooks/useFavorites";
import { CharactersContext } from "./CharactersContext";

export const CharactersProvider = ({ children }) => {
  const rickAndMortyData = useRickAndMorty();
  const favoritesData = useFavorites();

  const value = useMemo(
    () => ({
      ...rickAndMortyData,
      ...favoritesData,
    }),
    [favoritesData, rickAndMortyData]
  );

  return (
    <CharactersContext.Provider value={value}>{children}</CharactersContext.Provider>
  );
};
