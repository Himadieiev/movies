import {useRef, useEffect} from "react";
import {useDebounce} from "react-use";

import Header from "../components/Header";
import TrendingSection from "../components/TrendingSection";
import AllMoviesSection from "../components/AllMoviesSection";

const HomePage = ({
  searchTerm,
  setSearchTerm,
  onPageChange,
  trendingMovies,
  trendingError,
  isTrendingLoading,
  movieList,
  isLoading,
  isFirstLoad,
  errorMessage,
  onMovieClick,
  page,
  totalPages,
  setPage,
}) => {
  const moviesRef = useRef(null);
  const isFirstPageChange = useRef(true);

  useDebounce(() => onPageChange(searchTerm), 500, [searchTerm]);

  useEffect(() => {
    if (isFirstPageChange.current) {
      isFirstPageChange.current = false;
      return;
    }

    moviesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [page]);

  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <TrendingSection
        trendingMovies={trendingMovies}
        trendingError={trendingError}
        isTrendingLoading={isTrendingLoading}
      />

      <AllMoviesSection
        ref={moviesRef}
        movieList={movieList}
        isLoading={isLoading}
        isFirstLoad={isFirstLoad}
        errorMessage={errorMessage}
        onMovieClick={onMovieClick}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </>
  );
};

export default HomePage;
