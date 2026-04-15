import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {fetchPopularMovies, fetchTrendingMovies, fetchTopRatedMovies} from "../services/tmdb";
import {getTrendingMovies as getLocalTrendingMovies} from "../services/appwrite";
import Spinner from "./Spinner";
import TrendingTabs from "./TrendingTabs";

const TrendingSection = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("popular");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError("");

      try {
        let data;
        switch (activeTab) {
          case "searches":
            data = await getLocalTrendingMovies();
            break;
          case "popular":
            data = await fetchPopularMovies();
            data = data.results;
            break;
          case "trending":
            data = await fetchTrendingMovies();
            data = data.results;
            break;
          case "top_rated":
            data = await fetchTopRatedMovies();
            data = data.results;
            break;
          default:
            data = [];
        }
        setMovies(data || []);
      } catch (err) {
        setError("Failed to load movies");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <section className="trending">
      <h2>Trending Movies</h2>
      <TrendingTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="trending-content">
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : movies.length === 0 ? (
          <p className="text-gray-400">No movies yet.</p>
        ) : (
          <ul className={movies.length < 5 ? "justify-start" : "justify-between"}>
            {movies.slice(0, 5).map((movie, index) => {
              const isSearches = activeTab === "searches";
              const movieId = isSearches ? movie.movie_id : movie.id;
              const movieKey = isSearches ? movie.$id || index : movie.id || index;
              let posterUrl = null;
              const imagePath = isSearches ? movie.poster_url : movie.poster_path;

              if (imagePath && typeof imagePath === "string" && !imagePath.includes("null")) {
                posterUrl = isSearches ? imagePath : `https://image.tmdb.org/t/p/w500${imagePath}`;
              }
              const title = isSearches ? movie.movie_title : movie.title;

              return (
                <li key={movieKey}>
                  <p>{index + 1}</p>
                  {posterUrl ? (
                    <img src={posterUrl} alt={title} onClick={() => handleMovieClick(movieId)} />
                  ) : (
                    <div className="no-poster" onClick={() => handleMovieClick(movieId)}>
                      <span>No Poster</span>
                      <span className="no-poster-title">{title}</span>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

export default TrendingSection;
