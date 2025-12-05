import { useState, useCallback } from "react";

const FAVORITES_KEY = "pokemon-favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Array<number>>(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error("Error reading favorites from localStorage", error);
    }
    return [];
  });

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(id)
        ? prev.filter((id) => id !== id)
        : [...prev, id];

      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  return { favorites, toggleFavorite };
};
