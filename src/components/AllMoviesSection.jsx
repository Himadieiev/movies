import {forwardRef} from "react";

import MoviesGrid from "./MoviesGrid";
import Pagination from "./Pagination";

const AllMoviesSection = forwardRef(
  (
    {movieList, isLoading, isFirstLoad, errorMessage, onMovieClick, page, totalPages, setPage},
    ref,
  ) => {
    const showPagination = !errorMessage && !isLoading && movieList.length > 0;

    return (
      <section className="all-movies" ref={ref}>
        <h2 className="mt-10">All Movies</h2>

        {errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : movieList.length === 0 && !isLoading ? (
          <p className="text-gray-400 text-center py-20">No movies found. Try another search.</p>
        ) : (
          <MoviesGrid
            movieList={movieList}
            isLoading={isLoading}
            isFirstLoad={isFirstLoad}
            onMovieClick={onMovieClick}
          />
        )}

        {showPagination && <Pagination page={page} totalPages={totalPages} setPage={setPage} />}
      </section>
    );
  },
);

export default AllMoviesSection;
