import React from 'react';

interface PaginationProps {
  current: number;
  total: number;
  size: number;
  navigateToPage: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ current, total, size, navigateToPage }) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

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
              <a
                className={`enabled ${pageNumber === current ? 'current' : ''}`}
                onClick={() => navigateToPage(pageNumber)}
              >
                {pageNumber}
              </a>
            </React.Fragment>
          );
        }
        return null;
      })}
    </nav>
  );
};

export default Pagination;
