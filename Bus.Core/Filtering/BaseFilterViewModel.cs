namespace Bus.Core.Filtering
{
    /// <summary>
    /// Base class for all filter ViewModels providing common filtering functionality
    /// </summary>
    public abstract class BaseFilterViewModel
    {
        /// <summary>
        /// User area filter - common across all entities
        /// </summary>
        public int? UserAreaID { get; set; }

        /// <summary>
        /// Title or name filter for entities that have a title
        /// </summary>
        public string? Title { get; set; }

        /// <summary>
        /// Reference filter for entities that have a reference code
        /// </summary>
        public string? Reference { get; set; }

        /// <summary>
        /// Search term for text-based filtering
        /// </summary>
        public string? Description { get; set; }

        /// <summary>
        /// Global search string that can be applied to multiple fields
        /// </summary>
        public string? StringSearch { get; set; }

        /// <summary>
        /// Date range start
        /// </summary>
        public DateTime? FromDate { get; set; }

        /// <summary>
        /// Date range end
        /// </summary>
        public DateTime? ToDate { get; set; }

        // Pagination
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 50;

        // Sorting
        public string? SortBy { get; set; }
        public string? SortDirection { get; set; } = "desc"; // "asc" or "desc"

        /// <summary>
        /// Additional custom filters that can be extended per entity
        /// </summary>
        public Dictionary<string, object>? CustomFilters { get; set; }

        /// <summary>
        /// Check if any filters are active (excluding pagination and sorting)
        /// </summary>
        public virtual bool HasFilters()
        {
            return !string.IsNullOrEmpty(Description) ||
                   FromDate.HasValue ||
                   ToDate.HasValue ||
                   HasEntitySpecificFilters() ||
                   (CustomFilters?.Any() == true);
        }

        /// <summary>
        /// Override in derived classes to check for entity-specific filters
        /// </summary>
        protected virtual bool HasEntitySpecificFilters()
        {
            return false;
        }

        /// <summary>
        /// Get default sort property for the entity
        /// </summary>
        public virtual string GetDefaultSortBy()
        {
            return "CreatedDate";
        }
    }
}