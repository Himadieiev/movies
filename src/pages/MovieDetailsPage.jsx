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
    window.scrollTo(0, 0);
  }, []);

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
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="movie-details-page">
      <button onClick={() => navigate(-1)} className="back-button">
        <svg
          className="back-arrow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back
      </button>

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
          <h1>{movie.title}</h1>
          {movie.tagline && <p className="tagline">{movie.tagline}</p>}

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
        <h3>Overview</h3>
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
