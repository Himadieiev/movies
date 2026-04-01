import {useState, useEffect} from "react";

import {getItems, STORAGE_KEYS} from "../services/storage";
import MovieModal from "../components/MovieModal";
import Header from "../components/Header";

const UnwatchedPage = () => {
  const [unwatched, setUnwatched] = useState(() => getItems(STORAGE_KEYS.UNWATCHED));
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const handleStorageChange = () => {
      setUnwatched(getItems(STORAGE_KEYS.UNWATCHED));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const truncateOverview = (text, maxLength = 100) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <Header showSearch={false} title={<span className="text-gradient">Unwatched Movies</span>} />

      <section className="unwatched-section">
        {unwatched.length === 0 ? (
          <p className="unwatched-empty">No unwatched movies yet. Add some from the home page!</p>
        ) : (
          <div className="unwatched-table-wrapper">
            <table className="unwatched-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Poster</th>
                  <th>Title</th>
                  <th>Release Date</th>
                  <th>Overview</th>
                </tr>
              </thead>
              <tbody>
                {unwatched.map((movie, index) => (
                  <tr
                    key={movie.id}
                    onClick={() => setSelectedMovie(movie)}
                    className="unwatched-row"
                  >
                    <td className="unwatched-index">{index + 1}</td>
                    <td className="unwatched-poster-cell">
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`}
                          alt={movie.title}
                          className="unwatched-poster"
                        />
                      ) : (
                        <div className="unwatched-no-poster">No poster</div>
                      )}
                    </td>
                    <td className="unwatched-title-cell">{movie.title}</td>
                    <td className="unwatched-year">{formatDate(movie.release_date)}</td>
                    <td className="unwatched-overview">{truncateOverview(movie.overview)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </>
  );
};

export default UnwatchedPage;
