import {useDebounce} from "react-use";

import TrendingSection from "../components/TrendingSection";
import AllMoviesSection from "../components/AllMoviesSection";
import Search from "../components/Search";

const HomePage = ({
  searchTerm,
  setSearchTerm,
  onPageChange,
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
      <h1 className="text-gradient">Discover Your Next Favorite Movie</h1>

      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <TrendingSection />

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
