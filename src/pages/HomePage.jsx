import {useDebounce} from "react-use";
import {useEffect, useRef, useState} from "react";

import {useSearchHistory} from "../hooks/useSearchHistory";
import TrendingSection from "../components/TrendingSection";
import AllMoviesSection from "../components/AllMoviesSection";
import Search from "../components/Search";
import SearchHistory from "../components/SearchHistory";

const DEBOUNCE_DELAY = 500;

const HomePage = ({
  onPageChange,
  movieList,
  isLoading,
  errorMessage,
  onMovieClick,
  page,
  totalPages,
  setPage,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const {history, addToHistory, removeFromHistory, clearHistory} = useSearchHistory();
  const [showHistory, setShowHistory] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useDebounce(
    () => {
      onPageChange(searchTerm);

      if (searchTerm.trim()) addToHistory(searchTerm);
    },
    DEBOUNCE_DELAY,
    [searchTerm],
  );

  const handleHistoryClick = (term) => {
    setSearchTerm(term);
    onPageChange(term);
    addToHistory(term);
    setShowHistory(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowHistory(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!searchTerm.trim()) setShowHistory(false);
  }, [searchTerm]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowHistory(false);

        inputRef.current?.blur();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <h1 className="text-gradient mb-10">Discover Your Next Favorite Movie</h1>

      <div className="relative max-w-3xl mx-auto w-full" ref={containerRef}>
        <Search
          ref={inputRef}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onFocus={() => setShowHistory(true)}
        />

        {showHistory && (
          <SearchHistory
            history={history}
            onHistoryClick={handleHistoryClick}
            onRemove={removeFromHistory}
            onClear={clearHistory}
          />
        )}
      </div>

      <TrendingSection />

      <AllMoviesSection
        movieList={movieList}
        isLoading={isLoading}
        errorMessage={errorMessage}
        onMovieClick={onMovieClick}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </>
  );
};

export default HomePage;
