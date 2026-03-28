import {useEffect, useRef, useState} from "react";
import {useDebounce} from "react-use";

import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import Pagination from "./components/Pagination";
import MovieModal from "./components/MovieModal";
import {getTrendingMovies, updateSearchCount} from "./appwrite";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingError, setTrendingError] = useState("");
  const [isTrendingLoading, setIsTrendingLoading] = useState(true);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const moviesRef = useRef(null);
  const isFirstLoad = useRef(true);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "", pageNumber = 1) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${pageNumber}`
        : `${API_BASE_URL}/discover/movie?page=${pageNumber}`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      setMovieList(data.results || []);
      setTotalPages(data.total_pages || 1);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }

      isFirstLoad.current = false;
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    setIsTrendingLoading(true);
    setTrendingError("");

    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
      setTrendingError("Error fetching trending movies.");
    } finally {
      setIsTrendingLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm, page);
  }, [debouncedSearchTerm, page]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (page === 1) return;

    moviesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [page]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="trending">
          <h2>Trending Movies</h2>

          <div className="trending-content">
            {isTrendingLoading ? (
              <Spinner />
            ) : trendingError ? (
              <p className="text-red-500">{trendingError}</p>
            ) : trendingMovies.length === 0 ? (
              <p className="text-gray-400">No trending movies yet.</p>
            ) : (
              <ul className={trendingMovies.length < 5 ? "justify-start" : "justify-between"}>
                {trendingMovies.map((movie, index) => (
                  <li key={movie.$id}>
                    <p>{index + 1}</p>

                    {movie.poster_url && !movie.poster_url.includes("null") ? (
                      <img src={movie.poster_url} alt={movie.title} />
                    ) : (
                      <div className="no-poster">
                        <span>No Poster</span>
                        <span className="no-poster-title">{movie.movie_title}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="all-movies" ref={moviesRef}>
          <h2 className="mt-10">All Movies</h2>

          {errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {isLoading
                ? Array.from({length: 20}).map((_, i) => (
                    <li key={i} className="movie-card">
                      <div className="skeleton-poster" />
                      <div className="mt-4 space-y-2">
                        <div className="skeleton-line h-4 w-3/4" />
                        <div className="skeleton-line h-4 w-1/2" />
                      </div>
                    </li>
                  ))
                : movieList.map((movie, index) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      index={isFirstLoad.current ? index : 0}
                      onClick={() => setSelectedMovie(movie)}
                    />
                  ))}
            </ul>
          )}
        </section>

        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>

      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </main>
  );
};

export default App;
