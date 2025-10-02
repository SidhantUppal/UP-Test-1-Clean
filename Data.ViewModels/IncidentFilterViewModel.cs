using Bus.Core.Filtering;

namespace Data.ViewModels
{
    public class IncidentFilterViewModel : BaseFilterViewModel
    {
        // Incident-specific filters
        public int? IncidentTypeID { get; set; }
        public int? IncidentCategoryTypeID { get; set; }
        public int? IncidentStatusTypeID { get; set; }
        public int? IncidentSeverityTypeID { get; set; }
        public int? IncidentPriorityTypeID { get; set; }
        public int? AssignedToUserID { get; set; }

        /// <summary>
        /// Override to check incident-specific filters
        /// </summary>
        protected override bool HasEntitySpecificFilters()
        {
            return IncidentTypeID.HasValue ||
                   IncidentCategoryTypeID.HasValue ||
                   IncidentStatusTypeID.HasValue ||
                   IncidentSeverityTypeID.HasValue ||
                   IncidentPriorityTypeID.HasValue ||
                   AssignedToUserID.HasValue;
        }

        /// <summary>
        /// Default sort by IncidentDate for incidents
        /// </summary>
        public override string GetDefaultSortBy()
        {
            return "IncidentDate";
        }
    }
}