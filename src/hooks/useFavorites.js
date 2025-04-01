import { useState, useEffect } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("rickAndMortyFavorites");
    if (savedFavorites) {
      return JSON.parse(savedFavorites);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("rickAndMortyFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (character) => {
    if (!favorites.some((fav) => fav.id === character.id)) {
      setFavorites((prev) => [...prev, character]);
    }
  };

  const removeFavorite = (characterId) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== characterId));
  };

  const isFavorite = (characterId) => {
    return favorites.some((fav) => fav.id === characterId);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
};
