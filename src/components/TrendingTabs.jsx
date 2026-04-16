import {TRENDING_TABS} from "../constants/trendingTabs";

const TrendingTabs = ({
  activeTab,
  onTabChange,
  hideSearches = false,
  detailedDescription = false,
}) => {
  const filteredTabs = hideSearches
    ? TRENDING_TABS.filter((tab) => tab.id !== "searches")
    : TRENDING_TABS;
  const activeTabData = TRENDING_TABS.find((tab) => tab.id === activeTab);
  const activeDescription = detailedDescription
    ? activeTabData?.detailedDescription
    : activeTabData?.description;

  return (
    <div>
      <div className="trending-tabs">
        {filteredTabs.map((tab) => (
          <button
            key={tab.id}
            className={`trending-tab ${activeTab === tab.id ? "trending-tab--active" : ""}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <p
        className={`trending-description ${detailedDescription ? "trending-description--detailed" : ""}`}
      >
        {activeDescription}
      </p>
    </div>
  );
};

export default TrendingTabs;
