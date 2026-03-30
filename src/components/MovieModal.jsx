import {useEffect, useState} from "react";

const FAVORITES_KEY = "favorite_movies";

const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
};

const MovieModal = ({movie, onClose}) => {
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = getFavorites();
    return favorites.some((f) => f.id === movie.id);
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const {title, vote_average, poster_path, release_date, original_language, overview} = movie;

  const toggleFavorite = () => {
    const favorites = getFavorites();

    if (isFavorite) {
      const updated = favorites.filter((f) => f.id !== movie.id);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites, movie]));
      setIsFavorite(true);
    }

    window.dispatchEvent(new Event("storage"));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("uk-UA");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-layout">
          <img
            src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : "/no-movie.png"}
            alt={title}
            className="modal-poster"
          />

          <div className="modal-details">
            <h2 className="pt-2">{title}</h2>

            <div className="rating">
              <img src="star.svg" alt="Star Icon" />
              <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
            </div>

            <p className="lang">{original_language?.toUpperCase()}</p>

            <p className="year">{formatDate(release_date)}</p>
          </div>
        </div>

        {overview && <p className="modal-overview">{overview}</p>}

        <button
          className={`modal-favorite ${isFavorite ? "modal-favorite--active" : ""}`}
          onClick={toggleFavorite}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default MovieModal;
