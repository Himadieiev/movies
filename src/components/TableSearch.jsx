const TableSearch = ({searchTerm, setSearchTerm, placeholder = "Search..."}) => {
  const handleClear = () => setSearchTerm("");

  return (
    <div className="table-search">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="table-search-input"
      />
      {searchTerm && (
        <button onClick={handleClear} className="table-search-clear" aria-label="Clear search">
          ✕
        </button>
      )}
    </div>
  );
};

export default TableSearch;
