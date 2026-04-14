import {useState, useEffect} from "react";

const STORAGE_KEY = "search_history";
const MAX_HISTORY = 5;

export const useSearchHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
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
      const newHistory = [term, ...filtered].slice(0, MAX_HISTORY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const removeFromHistory = (term) => {
    setHistory((prev) => {
      const newHistory = prev.filter((item) => item !== term);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {history, addToHistory, removeFromHistory, clearHistory};
};
