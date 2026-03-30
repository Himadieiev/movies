import {useState, useEffect} from "react";

import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";

const FAVORITES_KEY = "favorite_movies";

const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
};

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState(() => getFavorites());
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const handleStorageChange = () => {
      setFavorites(getFavorites());
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <section className="all-movies">
      <h2 className="mt-10">Your Favorite Movies</h2>

      {favorites.length === 0 ? (
        <p className="text-gray-400 text-center py-20">
          No favorite movies yet. Add some from the home page!
        </p>
      ) : (
        <ul>
          {favorites.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              index={index}
              onClick={() => setSelectedMovie(movie)}
            />
          ))}
        </ul>
      )}

      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </section>
  );
};

export default FavoritesPage;
