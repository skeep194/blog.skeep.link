import { Link, navigate } from 'gatsby';
import React from 'react';


interface PaginationProps {
  current: number;
  total: number;
  size: number;
}




const Pagination: React.FC<PaginationProps> = ({ current, total, size }) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  const navigateToPage=(pageNumber: number) => {
    if(pageNumber === 1){
      navigate(`/`);
    }
    else{
      navigate(`/page/${pageNumber}`);
    }
  }
  return (
    <nav className="pagination">
      {pages.map((pageNumber) => {
        if (
          pageNumber === 1 ||
          pageNumber === total ||
          (pageNumber >= current - size && pageNumber <= current + size)
        ) {
          return (
            <React.Fragment key={pageNumber}>
              {pageNumber !== pages[0] && <span>··</span>}
              <button
                className={`enabled ${pageNumber === current ? 'current' : ''}`}
                onClick={() => navigateToPage(pageNumber)}
              >
                {pageNumber}
              </button>
            </React.Fragment>
          );
        }
        return null;
      })}
    </nav>
  );
};

export default Pagination;
