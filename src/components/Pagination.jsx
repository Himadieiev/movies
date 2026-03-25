const Pagination = ({page, totalPages, setPage}) => {
  const prev = () => {
    if (page > 1) setPage(page - 1);
  };

  const next = () => {
    if (page < totalPages) setPage(page + 1);
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
