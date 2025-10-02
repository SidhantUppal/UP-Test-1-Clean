'use client';

import React from 'react';

export interface PaginationInfo {
  page: number;
  pageSize: number | 'All';
  totalCount: number;
  totalPages: number;
  hasFilters?: boolean;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}

export interface PaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number | 'All') => void;
  pageSizeOptions?: (number | 'All')[];
  className?: string;
  showPageSizeSelector?: boolean;
  showInfo?: boolean;
}

export function Pagination({
  pagination,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100, 'All'],
  className = "",
  showPageSizeSelector = true,
  showInfo = true
}: PaginationProps) {
  const {
    page,
    pageSize,
    totalCount,
    totalPages,
    hasFilters = false
  } = pagination;

  // Calculate visible page numbers
  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show around current page
    const range = [];
    const rangeWithDots = [];

    // Always show first page
    if (totalPages <= 1) return [1];

    for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) {
      range.push(i);
    }

    // Add first page
    if (page - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    // Add middle pages
    rangeWithDots.push(...range);

    // Add last page
    if (page + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  const handlePageClick = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      onPageChange(newPage);
    }
  };

  const handlePageSizeChange = (newPageSize: number | 'All') => {
    if (onPageSizeChange) {
      onPageSizeChange(newPageSize);
    }
  };

  if (totalCount === 0) {
    return null;
  }

  // Handle "All" option - when showing all records
  const isShowingAll = pageSize === 'All';
  const numericPageSize = isShowingAll ? totalCount : pageSize;

  const startItem = isShowingAll ? 1 : (page - 1) * numericPageSize + 1;
  const endItem = isShowingAll ? totalCount : Math.min(page * numericPageSize, totalCount);

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
      {/* Info Section */}
      {showInfo && (
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{startItem}</span> to{' '}
            <span className="font-medium">{endItem}</span> of{' '}
            <span className="font-medium">{totalCount}</span> results
            {hasFilters && <span className="text-purple-600 ml-1">(filtered)</span>}
          </div>

          {/* Page Size Selector */}
          {showPageSizeSelector && onPageSizeChange && (
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700">Show:</label>
              <select
                value={pageSize}
                onChange={(e) => {
                  const value = e.target.value;
                  handlePageSizeChange(value === 'All' ? 'All' : parseInt(value));
                }}
                className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-700">per page</span>
            </div>
          )}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && !isShowingAll && (
        <div className="flex items-center gap-1">
          {/* Previous Button */}
          <button
            onClick={() => handlePageClick(page - 1)}
            disabled={page <= 1}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Page Numbers */}
          {visiblePages.map((pageNum, index) => {
            if (pageNum === '...') {
              return (
                <span
                  key={`dots-${index}`}
                  className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border-t border-b border-gray-300"
                >
                  ...
                </span>
              );
            }

            const pageNumber = pageNum as number;
            const isCurrentPage = pageNumber === page;

            return (
              <button
                key={pageNumber}
                onClick={() => handlePageClick(pageNumber)}
                className={`px-3 py-2 text-sm font-medium border-t border-b border-gray-300 ${
                  isCurrentPage
                    ? 'bg-purple-50 text-purple-600 border-purple-500 z-10'
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
                aria-label={`Page ${pageNumber}`}
                aria-current={isCurrentPage ? 'page' : undefined}
              >
                {pageNumber}
              </button>
            );
          })}

          {/* Next Button */}
          <button
            onClick={() => handlePageClick(page + 1)}
            disabled={page >= totalPages}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default Pagination;