import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {TMDB_IMAGE_BASE_URL} from "../constants/images";
import {fetchPopularMovies, fetchTrendingMovies, fetchTopRatedMovies} from "../services/tmdb";
import {getTrendingMovies as getLocalTrendingMovies} from "../services/appwrite";
import Spinner from "./Spinner";
import TrendingTabs from "./TrendingTabs";

const DISPLAY_LIMIT = 5;

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

  const handleViewAll = () => {
    if (activeTab !== "searches") {
      navigate(`/trending?tab=${activeTab}`);
    }
  };

  const getPosterUrl = (movie, isSearches) => {
    const imagePath = isSearches ? movie.poster_url : movie.poster_path;

    if (imagePath && typeof imagePath === "string" && !imagePath.includes("null")) {
      return isSearches ? imagePath : `${TMDB_IMAGE_BASE_URL}/w500${imagePath}`;
    }
    return null;
  };

  return (
    <section className="trending">
      <div className="title-wrapper">
        <h2 className="leading-normal">Trending Movies</h2>

        {activeTab !== "searches" && (
          <button className="view-all-btn" onClick={handleViewAll} title="View all">
            <span className="max-xs:hidden">View all</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              stroke="white"
              strokeWidth="2"
            >
              <polygon points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9" />
            </svg>
          </button>
        )}
      </div>

      <TrendingTabs activeTab={activeTab} onTabChange={setActiveTab} hideSearches={false} />

      <div className="trending-content">
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : movies.length === 0 ? (
          <p className="text-gray-400">No movies yet.</p>
        ) : (
          <ul className={movies.length < 5 ? "justify-start" : "justify-between"}>
            {movies.slice(0, DISPLAY_LIMIT).map((movie, index) => {
              const isSearches = activeTab === "searches";
              const movieId = isSearches ? movie.movie_id : movie.id;
              const movieKey = isSearches ? movie.$id || index : movie.id || index;
              const posterUrl = getPosterUrl(movie, isSearches);
              const title = isSearches ? movie.movie_title : movie.title;

              return (
                <li key={movieKey}>
                  <p>{index + 1}</p>
                  {posterUrl ? (
                    <img
                      src={posterUrl}
                      alt={title}
                      width={127}
                      height={170}
                      loading="lazy"
                      decoding="async"
                      onClick={() => handleMovieClick(movieId)}
                    />
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
