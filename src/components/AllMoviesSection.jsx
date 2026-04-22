import {useEffect, useRef} from "react";

import MoviesGrid from "./MoviesGrid";
import Pagination from "./Pagination";

const AllMoviesSection = ({
  movieList,
  isLoading,
  errorMessage,
  onMovieClick,
  page,
  totalPages,
  setPage,
}) => {
  const showPagination = !errorMessage && !isLoading && movieList.length > 0;
  const sectionRef = useRef(null);
  const pendingScroll = useRef(false);

  const handlePageChange = (newPage) => {
    if (newPage !== page) {
      setPage(newPage);
      pendingScroll.current = true;
    }
  };

  useEffect(() => {
    if (pendingScroll.current) {
      pendingScroll.current = false;
      sectionRef.current?.scrollIntoView({behavior: "smooth", block: "start"});
    }
  }, [movieList]);

  return (
    <section className="all-movies" ref={sectionRef}>
      <h2 className="mt-10">All Movies</h2>

      {errorMessage ? (
        <p className="text-red-500 text-center py-20">{errorMessage}</p>
      ) : movieList.length === 0 && !isLoading ? (
        <p className="text-gray-400 text-center py-20">No movies found. Try another search.</p>
      ) : (
        <MoviesGrid movieList={movieList} isLoading={isLoading} onMovieClick={onMovieClick} />
      )}

      {showPagination && (
        <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </section>
  );
};

export default AllMoviesSection;
