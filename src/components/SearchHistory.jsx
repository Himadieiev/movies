const SearchHistory = ({history, onHistoryClick, onRemove, onClear}) => {
  if (history.length === 0) return null;

  return (
    <div className="search-history">
      <div className="search-history-header">
        <span className="search-history-title">Recent searches:</span>
        <button onClick={onClear} className="search-history-clear">
          Clear all
        </button>
      </div>
      <ul className="search-history-list">
        {history.map((term) => (
          <li key={term} className="search-history-item">
            <button onClick={() => onHistoryClick(term)} className="search-history-term">
              {term}
            </button>
            <button
              onClick={() => onRemove(term)}
              className="search-history-remove"
              aria-label={`Remove ${term}`}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
