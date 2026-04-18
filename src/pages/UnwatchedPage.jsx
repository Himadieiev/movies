import {useState, useEffect, useMemo} from "react";

import {TMDB_IMAGE_BASE_URL} from "../constants/images";
import {STORAGE_KEYS} from "../constants/storageKeys";
import {formatDate, truncateOverview, handleKeyDown} from "../utils/helpers";
import {getItems} from "../services/storage";
import MovieModal from "../components/MovieModal";
import ConfirmModal from "../components/ConfirmModal";
import TableSearch from "../components/TableSearch";

const UnwatchedPage = () => {
  const [unwatched, setUnwatched] = useState(() => getItems(STORAGE_KEYS.UNWATCHED));
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleStorageChange = () => {
      setUnwatched(getItems(STORAGE_KEYS.UNWATCHED));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedMovies([]);
  }, [searchTerm]);

  const filteredMovies = useMemo(() => {
    if (!searchTerm.trim()) return unwatched;
    return unwatched.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [unwatched, searchTerm]);

  const requestSort = (key) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sortedMovies = useMemo(() => {
    if (!sortKey) return filteredMovies;

    return [...filteredMovies].sort((a, b) => {
      let aVal, bVal;

      switch (sortKey) {
        case "title":
          aVal = (a.title || "").toLowerCase();
          bVal = (b.title || "").toLowerCase();
          break;
        case "release_date":
          aVal = a.release_date ? new Date(a.release_date) : new Date(0);
          bVal = b.release_date ? new Date(b.release_date) : new Date(0);
          break;
        default:
          aVal = a[sortKey];
          bVal = b[sortKey];
      }

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredMovies, sortKey, sortDirection]);

  const getSortIcon = (key) => {
    if (sortKey !== key) return "⇅";
    return sortDirection === "asc" ? "↑" : "↓";
  };

  const handleSelectMovie = (movieId) => {
    setSelectedMovies((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId],
    );
  };

  const handleSelectAll = () => {
    setSelectedMovies(
      selectedMovies.length === sortedMovies.length ? [] : sortedMovies.map((m) => m.id),
    );
  };

  const handleDeleteSelected = () => {
    const updated = unwatched.filter((m) => !selectedMovies.includes(m.id));

    localStorage.setItem(STORAGE_KEYS.UNWATCHED, JSON.stringify(updated));

    setUnwatched(updated);
    setSelectedMovies([]);

    window.dispatchEvent(new Event("storage"));
  };

  return (
    <>
      <h1 className="text-gradient">Unwatched Movies</h1>

      <section className="unwatched-section">
        {unwatched.length === 0 ? (
          <p className="unwatched-empty pt-20">
            No unwatched movies yet. Add some from the home page!
          </p>
        ) : (
          <>
            <TableSearch
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              placeholder="Search by title..."
            />

            <div className="unwatched-actions-bar">
              {selectedMovies.length > 0 && (
                <button
                  onClick={() => {
                    if (selectedMovies.length === 1) {
                      handleDeleteSelected();
                    } else {
                      setShowConfirm(true);
                    }
                  }}
                  className="unwatched-delete-btn"
                  aria-label={`Delete ${selectedMovies.length} selected movies`}
                >
                  Delete selected ({selectedMovies.length})
                </button>
              )}
            </div>

            {sortedMovies.length === 0 ? (
              <p className="unwatched-empty pt-8">No movies found matching "{searchTerm}"</p>
            ) : (
              <div className="unwatched-table-wrapper">
                <table className="unwatched-table">
                  <thead>
                    <tr>
                      <th className="unwatched-checkbox-cell">
                        <input
                          type="checkbox"
                          checked={
                            selectedMovies.length === sortedMovies.length && sortedMovies.length > 0
                          }
                          onChange={handleSelectAll}
                          className="unwatched-checkbox"
                          aria-label={
                            selectedMovies.length === sortedMovies.length
                              ? "Deselect all"
                              : "Select all"
                          }
                        />
                      </th>
                      <th>#</th>
                      <th>Poster</th>
                      <th
                        onClick={() => requestSort("title")}
                        onKeyDown={handleKeyDown(() => requestSort("title"))}
                        className="sortable-header"
                        tabIndex={0}
                      >
                        Title <span className="sort-icon">{getSortIcon("title")}</span>
                      </th>
                      <th
                        onClick={() => requestSort("release_date")}
                        onKeyDown={handleKeyDown(() => requestSort("release_date"))}
                        className="sortable-header"
                        tabIndex={0}
                      >
                        Release Date{" "}
                        <span className="sort-icon">{getSortIcon("release_date")}</span>
                      </th>
                      <th>Overview</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedMovies.map((movie, index) => (
                      <tr
                        key={movie.id}
                        onClick={() => setSelectedMovie(movie)}
                        onKeyDown={handleKeyDown(() => setSelectedMovie(movie))}
                        className="unwatched-row"
                        tabIndex={0}
                      >
                        <td
                          className="unwatched-checkbox-cell"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            checked={selectedMovies.includes(movie.id)}
                            onChange={() => handleSelectMovie(movie.id)}
                            onClick={(e) => e.stopPropagation()}
                            className="unwatched-checkbox"
                          />
                        </td>
                        <td className="unwatched-index">{index + 1}</td>
                        <td className="unwatched-poster-cell">
                          {movie.poster_path ? (
                            <img
                              className="unwatched-poster"
                              src={`${TMDB_IMAGE_BASE_URL}/w92/${movie.poster_path}`}
                              alt={movie.title}
                              width={43}
                              height={64}
                              loading="lazy"
                              decoding="async"
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
          </>
        )}
      </section>

      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}

      {showConfirm && (
        <ConfirmModal
          message={`Delete ${selectedMovies.length} movies from unwatched?`}
          onConfirm={() => {
            handleDeleteSelected();
            setShowConfirm(false);
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};

export default UnwatchedPage;
