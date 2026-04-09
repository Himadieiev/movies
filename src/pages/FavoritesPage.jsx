import {useState, useEffect} from "react";

import {getItems, STORAGE_KEYS} from "../services/storage";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState(() => getItems(STORAGE_KEYS.FAVORITES));
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const handleStorageChange = () => {
      setFavorites(getItems(STORAGE_KEYS.FAVORITES));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      <h1 className="text-gradient">Your Favorite Movies</h1>

      <section className="all-movies pt-8 sm:pt-15">
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

        {selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
        )}
      </section>
    </>
  );
};

export default FavoritesPage;
