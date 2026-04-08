import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";

import {formatDate, formatRuntime} from "../utils/helpers";
import {fetchMovieDetails} from "../services/tmdb";
import Spinner from "../components/Spinner";

const getTrailerKey = (videos) => {
  if (!videos?.results) return null;

  const officialTrailer = videos.results.find(
    (video) => video.type === "Trailer" && video.official === true,
  );

  const anyTrailer = videos.results.find(
    (video) => video.type === "Trailer" || video.type === "Teaser",
  );

  return officialTrailer?.key || anyTrailer?.key;
};

const MovieDetailsPage = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovieDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) loadMovieDetails();
  }, [id]);

  const trailerKey = movie ? getTrailerKey(movie.videos) : null;
  const director = movie?.credits?.crew?.find((person) => person.job === "Director");
  const cast = movie?.credits?.cast?.slice(0, 12);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-20">
        <Spinner />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">{error || "Movie not found"}</p>
        <button onClick={() => navigate(-1)} className="button-error-back ">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="movie-details-page">
      <div className="movie-details-title">
        <h1>
          <span className="text-gradient">{movie.title}</span>
        </h1>
        {movie.tagline && <p className="tagline">{movie.tagline}</p>}
      </div>

      <div className="movie-details-header">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : "/no-movie.png"
          }
          alt={movie.title}
          className="movie-details-poster"
          loading="eager"
          width="300"
          height="450"
        />

        <div className="movie-details-info">
          <ul className="details-list">
            <li>
              <span className="label">Rating:</span>
              <span>
                ⭐ {movie.vote_average?.toFixed(1)} / 10 ({movie.vote_count} votes)
              </span>
            </li>
            <li>
              <span className="label">Release Date:</span>
              <span>{formatDate(movie.release_date)}</span>
            </li>
            <li>
              <span className="label">Runtime:</span>
              <span>{formatRuntime(movie.runtime)}</span>
            </li>
            <li>
              <span className="label">Genres:</span>
              <span>{movie.genres?.map((g) => g.name).join(", ") || "N/A"}</span>
            </li>
            {director && (
              <li>
                <span className="label">Director:</span>
                <span>{director.name}</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="overview">
        <h2>Overview</h2>
        <p>{movie.overview || "No overview available."}</p>
      </div>

      {trailerKey && (
        <div className="trailer-section">
          <h2>Official Trailer</h2>
          <div className="trailer-container">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Movie Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {cast && cast.length > 0 && (
        <div className="cast-section">
          <h2>Top Cast</h2>
          <ul className="cast-grid">
            {cast.map((actor) => (
              <li key={actor.id} className="cast-card">
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w185/${actor.profile_path}`}
                    alt={actor.name}
                    loading="lazy"
                  />
                ) : (
                  <div className="no-avatar">No photo</div>
                )}
                <p className="actor-name">{actor.name}</p>
                <p className="character-name">{actor.character}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
