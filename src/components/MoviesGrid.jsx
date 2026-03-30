import MovieCard from "./MovieCard";

const MoviesGrid = ({movieList, isLoading, onMovieClick}) => {
  return (
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
              index={index}
              onClick={() => onMovieClick(movie)}
            />
          ))}
    </ul>
  );
};

export default MoviesGrid;
