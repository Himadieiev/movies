const Pagination = ({page, totalPages, onPageChange}) => {
  const prev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const next = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return (
    <div className="pagination">
      <button onClick={prev} disabled={page === 1}>
        Prev
      </button>

      <span>
        {page} / {totalPages}
      </span>

      <button onClick={next} disabled={page === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
