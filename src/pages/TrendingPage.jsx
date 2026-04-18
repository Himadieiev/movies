import {useState, useEffect} from "react";
import {useSearchParams, useNavigate} from "react-router-dom";

import {TMDB_IMAGE_BASE_URL} from "../constants/images";
import {fetchPopularMovies, fetchTrendingMovies, fetchTopRatedMovies} from "../services/tmdb";
import Spinner from "../components/Spinner";
import TrendingTabs from "../components/TrendingTabs";

const ITEMS_PER_PAGE = 20;
const VALID_TABS = ["popular", "trending", "top_rated"];

const fetchMoviesByTab = async (tab, page) => {
  switch (tab) {
    case "popular":
      return await fetchPopularMovies(page);
    case "trending":
      return await fetchTrendingMovies("week", page);
    case "top_rated":
      return await fetchTopRatedMovies(page);
    default:
      return {results: []};
  }
};

const filterUniqueMovies = (newMovies, existingMovies) => {
  const existingIds = new Set(existingMovies.map((m) => m.id));
  return newMovies.filter((movie) => !existingIds.has(movie.id));
};

const getPosterUrl = (posterPath) => {
  return posterPath ? `${TMDB_IMAGE_BASE_URL}/w200${posterPath}` : "/no-movie.png";
};

const TrendingPage = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");

  const validTab = tabParam && VALID_TABS.includes(tabParam) ? tabParam : VALID_TABS[0];
  const [activeTab, setActiveTab] = useState(validTab);

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setSearchParams({tab: activeTab});
  }, [activeTab, setSearchParams]);

  useEffect(() => {
    setMovies([]);
    setCurrentPage(1);
    setHasMore(true);
  }, [activeTab]);

  useEffect(() => {
    const fetchFirstPage = async () => {
      setIsLoading(true);
      setError("");

      try {
        const data = await fetchMoviesByTab(activeTab, 1);
        setMovies(data.results || []);
        setHasMore((data.results || []).length === ITEMS_PER_PAGE);
      } catch (err) {
        setError("Failed to load movies");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFirstPage();
  }, [activeTab]);

  const loadMore = async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    const nextPage = currentPage + 1;

    try {
      const data = await fetchMoviesByTab(activeTab, nextPage);

      const newMovies = data.results || [];
      const uniqueNewMovies = filterUniqueMovies(newMovies, movies);

      setMovies((prev) => [...prev, ...uniqueNewMovies]);
      setCurrentPage(nextPage);
      setHasMore(newMovies.length === ITEMS_PER_PAGE);
    } catch (err) {
      console.error("Failed to load more movies", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <>
      <h1 className="text-gradient">Trending Movies</h1>
      <TrendingTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        hideSearches={true}
        detailedDescription={true}
      />

      <section className="trending-page">
        {isLoading ? (
          <div className="flex justify-center my-5">
            <Spinner />
          </div>
        ) : error ? (
          <p className="text-red-500 text-center py-20">{error}</p>
        ) : movies.length === 0 ? (
          <p className="text-gray-400 text-center py-20">No movies found.</p>
        ) : (
          <>
            <div className="trending-page-list">
              {movies.map((movie, index) => (
                <div
                  key={movie.id}
                  className="trending-page-card"
                  onClick={() => handleMovieClick(movie.id)}
                >
                  <div className="trending-page-rank">{index + 1}</div>
                  <img
                    className="trending-page-poster"
                    src={getPosterUrl(movie.poster_path)}
                    alt={movie.title}
                    width={64}
                    height={96}
                    decoding="async"
                    loading="lazy"
                  />
                  <div className="trending-page-info">
                    <h3>{movie.title}</h3>
                    <div className="trending-page-meta">
                      <div className="trending-rating">
                        <img src="/star.svg" alt="Star Icon" />
                        <span>{movie.vote_average?.toFixed(1)}</span>
                      </div>
                      <span>{movie.release_date?.split("-")[0]}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="trending-page-loadmore">
                <button
                  onClick={loadMore}
                  disabled={isLoadingMore}
                  className="trending-loadmore-btn"
                >
                  {isLoadingMore ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default TrendingPage;
