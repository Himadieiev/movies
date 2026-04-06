import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {formatDateUA} from "../utils/helpers";
import {getItems, toggleItem, STORAGE_KEYS} from "../services/storage";

const MovieModal = ({movie, onClose}) => {
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = getItems(STORAGE_KEYS.FAVORITES);
    return favorites.some((f) => f.id === movie.id);
  });
  const [isUnwatched, setIsUnwatched] = useState(() => {
    const unwatched = getItems(STORAGE_KEYS.UNWATCHED);
    return unwatched.some((m) => m.id === movie.id);
  });

  const navigate = useNavigate();

  const navigateToMovieDetails = () => {
    onClose();
    navigate(`/movie/${movie.id}`);
  };

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

  const handleToggleFavorite = () => {
    const newState = toggleItem(STORAGE_KEYS.FAVORITES, movie, isFavorite);
    setIsFavorite(newState);
  };

  const handleToggleUnwatched = () => {
    const newState = toggleItem(STORAGE_KEYS.UNWATCHED, movie, isUnwatched);
    setIsUnwatched(newState);
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
            decoding="async"
            width="128"
            height="192"
          />

          <div className="modal-details">
            <h2>{title}</h2>

            <div className="rating">
              <img src="/star.svg" alt="Star Icon" />
              <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
            </div>

            <p className="lang">{original_language?.toUpperCase()}</p>

            <p className="year">{formatDateUA(release_date)}</p>
          </div>
        </div>

        {overview && <p className="modal-overview">{overview}</p>}

        <div className="modal-actions">
          <button
            className={`modal-button modal-button--favorite ${isFavorite ? "modal-button--active" : ""}`}
            onClick={handleToggleFavorite}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>

          <button
            className={`modal-button modal-button--unwatched ${isUnwatched ? "modal-button--active" : ""}`}
            onClick={handleToggleUnwatched}
          >
            {isUnwatched ? "Remove from Unwatched" : "Add to Unwatched"}
          </button>

          <button className="modal-button modal-button--details" onClick={navigateToMovieDetails}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
