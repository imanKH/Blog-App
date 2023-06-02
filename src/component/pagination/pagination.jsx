import "./pagination.css";

import {BsChevronRight , BsChevronLeft} from 'react-icons/bs';

const Pagination = ({ pages, currentPage, setCurrentPage }) => {
  const generatedPages = [];
  for (let i = 1; i <= pages; i++) {
    generatedPages.push(i);
  }
  return (
    <div className="pagination flex items-center justify-center gap-4 mb-5 mt-5">
      <button
        className=""
        onClick={() => setCurrentPage((current) => current - 1)}
        disabled={currentPage === 1}
      >
       <BsChevronLeft/>
      </button>
      {generatedPages.map((page) => (
        <div
          onClick={() => setCurrentPage(page)}
          key={page}
          className={currentPage === page ? "page active" : "page"}
        >
          {page}
        </div>
      ))}
      <button
        className=""
        onClick={() => setCurrentPage((current) => current + 1)}
        disabled={currentPage === pages}
      >
        <BsChevronRight className="" />
      </button>
    </div>
  );
};

export default Pagination;
