import {useState, useEffect, useRef, useMemo} from "react";
import {useQuery} from "@tanstack/react-query";

import {fetchUpcomingMovies} from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import Pagination from "../components/Pagination";
import MoviesGrid from "../components/MoviesGrid";

const UpcomingPage = () => {
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const titleRef = useRef(null);
  const pendingScroll = useRef(false);

  const {data, isLoading, error} = useQuery({
    queryKey: ["upcoming", page],
    queryFn: () => fetchUpcomingMovies(page),
    keepPreviousData: true,
  });

  const movies = useMemo(() => data?.results || [], [data]);
  const totalPages = data?.total_pages || 1;

  const handlePageChange = (newPage) => {
    if (newPage !== page) {
      setPage(newPage);
      pendingScroll.current = true;
    }
  };

  useEffect(() => {
    if (pendingScroll.current) {
      pendingScroll.current = false;
      titleRef.current?.scrollIntoView({behavior: "smooth", block: "start"});
    }
  }, [movies]);

  return (
    <>
      <h1 className="text-gradient" ref={titleRef}>
        Coming Soon
      </h1>

      <p className="text-gray-400 text-sm max-w-2xl mx-auto text-center mt-5">
        Note: This list includes upcoming theatrical releases, re-releases, and special screenings.
        Some older films may appear here due to future anniversary screenings or limited
        re-releases.
      </p>

      <section className="all-movies pt-8 sm:pt-15">
        {error ? (
          <p className="text-red-500 text-center py-20">{error.message}</p>
        ) : movies.length === 0 && !isLoading ? (
          <p className="text-gray-400 text-center py-20">No upcoming movies found.</p>
        ) : (
          <>
            <MoviesGrid movieList={movies} isLoading={isLoading} onMovieClick={setSelectedMovie} />

            {!isLoading && movies.length > 0 && totalPages > 1 && (
              <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
          </>
        )}
      </section>

      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </>
  );
};

export default UpcomingPage;
