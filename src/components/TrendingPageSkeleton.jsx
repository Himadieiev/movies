const TrendingPageSkeleton = () => {
  return (
    <div className="trending-page-list">
      {Array.from({length: 20}).map((_, index) => (
        <div key={index} className="trending-page-card">
          <div className="skeleton-poster w-20 h-30 sm:w-16 sm:h-24" />
        </div>
      ))}
    </div>
  );
};

export default TrendingPageSkeleton;
