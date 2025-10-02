using Bus.Core.Filtering;

namespace Data.ViewModels
{
    public class HazardFilterViewModel : BaseFilterViewModel
    {
        // Hazard-specific filters
        public int? HazardCategoryTypeID { get; set; }
        public int? HazardSeverityTypeID { get; set; }
        public int? AssignedToUserID { get; set; }
        public int? AssignedToRoleID { get; set; }
        public int? LocationID { get; set; }
        public bool? IsActive { get; set; }

        /// <summary>
        /// Override to check hazard-specific filters
        /// </summary>
        protected override bool HasEntitySpecificFilters()
        {
            return HazardCategoryTypeID.HasValue ||
                   HazardSeverityTypeID.HasValue ||
                   AssignedToUserID.HasValue ||
                   AssignedToRoleID.HasValue ||
                   LocationID.HasValue ||
                   IsActive.HasValue;
        }

        /// <summary>
        /// Default sort by CreatedDate for hazards
        /// </summary>
        public override string GetDefaultSortBy()
        {
            return "CreatedDate";
        }
    }
}