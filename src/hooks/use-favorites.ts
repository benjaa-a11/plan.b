"use client";

import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'plan-b-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Error loading favorites from localStorage", error);
      setFavorites([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const updateLocalStorage = (newFavorites: string[]) => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Error saving favorites to localStorage", error);
    }
  };

  const addFavorite = useCallback((channelId: string) => {
    setFavorites(prev => {
      if (prev.includes(channelId)) return prev;
      const newFavorites = [...prev, channelId];
      updateLocalStorage(newFavorites);
      return newFavorites;
    });
  }, []);

  const removeFavorite = useCallback((channelId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.filter(id => id !== channelId);
      updateLocalStorage(newFavorites);
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((channelId: string) => {
    return favorites.includes(channelId);
  }, [favorites]);

  return { favorites, addFavorite, removeFavorite, isFavorite, isLoaded };
}
