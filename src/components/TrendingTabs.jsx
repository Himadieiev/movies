const TRENDING_TABS = [
  {id: "searches", label: "Top Searches", description: "Most searched movies on this site"},
  {id: "popular", label: "Popular", description: "Currently popular movies on TMDB"},
  {id: "trending", label: "Trending", description: "Trending movies this week on TMDB"},
  {id: "top_rated", label: "Top Rated", description: "Highest rated movies of all time"},
];

const TrendingTabs = ({activeTab, onTabChange}) => {
  const activeDescription = TRENDING_TABS.find((tab) => tab.id === activeTab)?.description;

  return (
    <div>
      <div className="trending-tabs">
        {TRENDING_TABS.map((tab) => (
          <button
            key={tab.id}
            className={`trending-tab ${activeTab === tab.id ? "trending-tab--active" : ""}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <p className="trending-description">{activeDescription}</p>
    </div>
  );
};

export default TrendingTabs;
