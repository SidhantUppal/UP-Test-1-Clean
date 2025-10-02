namespace Bus.Core.Enums
{
    /// <summary>
    /// Incident status types enumeration
    /// Values correspond to IncidentStatusTypeID in V7.IncidentStatusType table
    /// </summary>
    public enum IncidentStatusType
    {
        /// <summary>
        /// Incident is open and requires attention
        /// </summary>
        Open = 1,

        /// <summary>
        /// Incident is being actively worked on
        /// </summary>
        InProgress = 2,

        /// <summary>
        /// Incident is under review for completion
        /// </summary>
        UnderReview = 3,

        /// <summary>
        /// Incident has been resolved and closed
        /// </summary>
        Closed = 4,

        /// <summary>
        /// Incident has been archived
        /// </summary>
        Archived = 5
    }
}