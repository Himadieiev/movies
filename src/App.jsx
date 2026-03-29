import {useEffect, useRef, useState} from "react";
import {BrowserRouter} from "react-router-dom";

import {fetchMoviesFromTMDB} from "./services/tmdb";
import {getTrendingMovies, updateSearchCount} from "./services/appwrite";
import HomePage from "./pages/HomePage";
import MovieModal from "./components/MovieModal";
import Navigation from "./components/Navigation";

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

  const isFirstLoad = useRef(true);

  const fetchMovies = async (query = "", pageNumber = 1) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const data = await fetchMoviesFromTMDB(query, pageNumber);

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

  const handleSearch = (term) => {
    setDebouncedSearchTerm(term);
    setPage(1);
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm, page);
  }, [debouncedSearchTerm, page]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <BrowserRouter>
      <main>
        <div className="pattern" />
        <div className="wrapper">
          <Navigation />

          <HomePage
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            trendingMovies={trendingMovies}
            trendingError={trendingError}
            isTrendingLoading={isTrendingLoading}
            movieList={movieList}
            isLoading={isLoading}
            isFirstLoad={isFirstLoad.current}
            errorMessage={errorMessage}
            onMovieClick={setSelectedMovie}
            page={page}
            totalPages={totalPages}
            setPage={setPage}
            onPageChange={handleSearch}
          />
        </div>

        {selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
        )}
      </main>
    </BrowserRouter>
  );
};

export default App;
