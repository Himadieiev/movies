import {useDebounce} from "react-use";
import {useEffect, useRef, useState} from "react";
import {useQuery} from "@tanstack/react-query";

import {fetchMoviesFromTMDB} from "../services/tmdb";
import {updateSearchCount} from "../services/appwrite";
import {useSearchHistory} from "../hooks/useSearchHistory";
import TrendingSection from "../components/TrendingSection";
import AllMoviesSection from "../components/AllMoviesSection";
import Search from "../components/Search";
import SearchHistory from "../components/SearchHistory";
import MovieModal from "../components/MovieModal";

const DEBOUNCE_DELAY = 500;

const HomePage = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const {history, addToHistory, removeFromHistory, clearHistory} = useSearchHistory();

  const handleSearch = (term) => {
    setDebouncedSearchTerm(term);
    setPage(1);
  };

  const handleHistoryClick = (term) => {
    setSearchTerm(term);
    handleSearch(term);
    addToHistory(term);
    setShowHistory(false);
  };

  useDebounce(
    () => {
      handleSearch(searchTerm);
      if (searchTerm.trim()) addToHistory(searchTerm);
    },
    DEBOUNCE_DELAY,
    [searchTerm],
  );

  const {data, isLoading, error} = useQuery({
    queryKey: ["movies", debouncedSearchTerm, page],
    queryFn: () => fetchMoviesFromTMDB(debouncedSearchTerm, page),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });

  const movieList = data?.results || [];
  const totalPages = data?.total_pages || 1;
  const errorMessage = error?.message || "";

  useEffect(() => {
    if (data?.results?.length > 0 && debouncedSearchTerm) {
      updateSearchCount(debouncedSearchTerm, data.results[0]);
    }
  }, [data, debouncedSearchTerm]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowHistory(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowHistory(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!searchTerm.trim()) setShowHistory(false);
  }, [searchTerm]);

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
        onMovieClick={setSelectedMovie}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />

      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </>
  );
};

export default HomePage;
