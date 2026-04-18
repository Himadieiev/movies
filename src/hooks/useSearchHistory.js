import {useState, useEffect} from "react";

import {STORAGE_KEYS} from "../constants/storageKeys";

const MAX_HISTORY_ITEMS = 5;

export const useSearchHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse search history", e);
      }
    }
  }, []);

  const addToHistory = (term) => {
    if (!term.trim()) return;

    setHistory((prev) => {
      const filtered = prev.filter((item) => item !== term);
      const newHistory = [term, ...filtered].slice(0, MAX_HISTORY_ITEMS);
      localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const removeFromHistory = (term) => {
    setHistory((prev) => {
      const newHistory = prev.filter((item) => item !== term);
      localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEYS.SEARCH_HISTORY);
  };

  return {history, addToHistory, removeFromHistory, clearHistory};
};
