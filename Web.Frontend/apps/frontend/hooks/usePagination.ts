import { useState, useCallback } from 'react';

export interface UsePaginationConfig {
  initialPage?: number;
  initialPageSize?: number | 'All';
  onPaginationChange?: (page: number, pageSize: number | 'All') => void;
}

export interface UsePaginationReturn {
  page: number;
  pageSize: number | 'All';
  setPage: (page: number) => void;
  setPageSize: (pageSize: number | 'All') => void;
  handlePageChange: (newPage: number) => void;
  handlePageSizeChange: (newPageSize: number | 'All') => void;
  resetPagination: () => void;
}

export function usePagination({
  initialPage = 1,
  initialPageSize = 25,
  onPaginationChange
}: UsePaginationConfig = {}): UsePaginationReturn {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    if (onPaginationChange) {
      onPaginationChange(newPage, pageSize);
    }
  }, [pageSize, onPaginationChange]);

  const handlePageSizeChange = useCallback((newPageSize: number | 'All') => {
    setPageSize(newPageSize);
    setPage(1); // Reset to first page when changing page size
    if (onPaginationChange) {
      onPaginationChange(1, newPageSize);
    }
  }, [onPaginationChange]);

  const resetPagination = useCallback(() => {
    setPage(initialPage);
    setPageSize(initialPageSize);
    if (onPaginationChange) {
      onPaginationChange(initialPage, initialPageSize);
    }
  }, [initialPage, initialPageSize, onPaginationChange]);

  return {
    page,
    pageSize,
    setPage,
    setPageSize,
    handlePageChange,
    handlePageSizeChange,
    resetPagination
  };
}

export default usePagination;