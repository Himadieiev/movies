import Spinner from "./Spinner";

const TrendingSection = ({trendingMovies, trendingError, isTrendingLoading}) => {
  return (
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
  );
};

export default TrendingSection;
