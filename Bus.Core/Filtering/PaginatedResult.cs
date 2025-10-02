namespace Bus.Core.Filtering
{
    /// <summary>
    /// Standard paginated result wrapper for API responses
    /// </summary>
    /// <typeparam name="T">The entity type</typeparam>
    public class PaginatedResult<T>
    {
        public IEnumerable<T> Data { get; set; } = new List<T>();
        public PaginationInfo Pagination { get; set; } = new();

        public PaginatedResult() { }

        public PaginatedResult(IEnumerable<T> data, int totalCount, int page, int pageSize, bool hasFilters = false)
        {
            Data = data;
            Pagination = new PaginationInfo
            {
                Page = page,
                PageSize = pageSize,
                TotalCount = totalCount,
                TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize),
                HasFilters = hasFilters
            };
        }
    }

    public class PaginationInfo
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public int TotalPages { get; set; }
        public bool HasFilters { get; set; }
        public bool HasPreviousPage => Page > 1;
        public bool HasNextPage => Page < TotalPages;
    }

    /// <summary>
    /// Extension methods for creating paginated results
    /// </summary>
    public static class PaginatedResultExtensions
    {
        /// <summary>
        /// Create a paginated result from an IQueryable with filters applied
        /// </summary>
        public static async Task<PaginatedResult<T>> ToPaginatedResultAsync<T, TFilter>(
            this IQueryable<T> query,
            TFilter filter)
            where TFilter : BaseFilterViewModel
        {
            // Apply filters
            var filteredQuery = query.ApplyFilters(filter);

            // Apply sorting
            var sortBy = !string.IsNullOrEmpty(filter.SortBy) ? filter.SortBy : filter.GetDefaultSortBy();
            var sortedQuery = filteredQuery.ApplySorting(sortBy, filter.SortDirection);

            // Get total count before pagination
            var totalCount = sortedQuery.Count();

            // Apply pagination
            var paginatedQuery = sortedQuery.ApplyPagination(filter.Page, filter.PageSize);

            // Execute query
            var data = paginatedQuery.ToList();

            return new PaginatedResult<T>(data, totalCount, filter.Page, filter.PageSize, filter.HasFilters());
        }

        /// <summary>
        /// Create a paginated result from an existing collection
        /// </summary>
        public static PaginatedResult<T> ToPaginatedResult<T, TFilter>(
            this IEnumerable<T> collection,
            TFilter filter)
            where TFilter : BaseFilterViewModel
        {
            var query = collection.AsQueryable();
            return query.ToPaginatedResultAsync(filter).Result;
        }
    }
}