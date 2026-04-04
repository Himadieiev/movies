import {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import {fetchMoviesFromTMDB} from "./services/tmdb";
import {updateSearchCount} from "./services/appwrite";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import UnwatchedPage from "./pages/UnwatchedPage";
import MovieModal from "./components/MovieModal";
import Header from "./components/Header";

const App = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedMovie, setSelectedMovie] = useState(null);

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
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (term) => {
    setDebouncedSearchTerm(term);
    setPage(1);
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm, page);
  }, [debouncedSearchTerm, page]);

  return (
    <BrowserRouter>
      <main>
        <div className="pattern" />
        <div className="wrapper">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  movieList={movieList}
                  isLoading={isLoading}
                  errorMessage={errorMessage}
                  onMovieClick={setSelectedMovie}
                  page={page}
                  totalPages={totalPages}
                  setPage={setPage}
                  onPageChange={handleSearch}
                />
              }
            />

            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/unwatched" element={<UnwatchedPage />} />
          </Routes>
        </div>

        {selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
        )}
      </main>
    </BrowserRouter>
  );
};

export default App;
