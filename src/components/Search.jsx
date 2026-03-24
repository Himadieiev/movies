import {useEffect, useState} from "react";

const Search = ({searchTerm, setSearchTerm}) => {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width: 425px)").matches);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 425px)");

    const handler = (e) => setIsMobile(e.matches);

    media.addEventListener("change", handler);

    return () => media.removeEventListener("change", handler);
  }, []);

  return (
    <div className="search">
      <div>
        <img src="search.svg" alt="search" />

        <input
          type="text"
          placeholder={isMobile ? "Search movies" : "Search through thousand of movies"}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
