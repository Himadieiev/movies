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
  errorMessage,
  onMovieClick,
  page,
  totalPages,
  setPage,
}) => {
  useDebounce(() => onPageChange(searchTerm), 500, [searchTerm]);

  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} showSearch={true} />

      <TrendingSection
        trendingMovies={trendingMovies}
        trendingError={trendingError}
        isTrendingLoading={isTrendingLoading}
      />

      <AllMoviesSection
        movieList={movieList}
        isLoading={isLoading}
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
