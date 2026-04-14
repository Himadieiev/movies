import {forwardRef, useEffect, useState} from "react";

const Search = forwardRef(({searchTerm, setSearchTerm, onFocus}, ref) => {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width: 425px)").matches);

  const handleClear = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    const media = window.matchMedia("(max-width: 425px)");

    const handler = (e) => setIsMobile(e.matches);

    media.addEventListener("change", handler);

    return () => media.removeEventListener("change", handler);
  }, []);

  return (
    <div className="search">
      <div>
        <img src="/search.svg" alt="search" />

        <input
          ref={ref}
          type="text"
          placeholder={isMobile ? "Search movies" : "Search through thousand of movies"}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={onFocus}
        />

        {searchTerm && (
          <button onClick={handleClear} aria-label="Clear search" type="button">
            ✕
          </button>
        )}
      </div>
    </div>
  );
});

export default Search;
