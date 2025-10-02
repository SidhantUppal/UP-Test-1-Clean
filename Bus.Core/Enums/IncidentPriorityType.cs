namespace Bus.Core.Enums
{
    /// <summary>
    /// Incident priority types enumeration
    /// Values correspond to IncidentPriorityTypeID in V7.IncidentPriorityType table
    /// </summary>
    public enum IncidentPriorityType
    {
        Unknown = 0,

        /// <summary>
        /// Low priority incident - can be handled in routine timeframe
        /// </summary>
        Low = 1,

        /// <summary>
        /// Medium priority incident - should be addressed promptly
        /// </summary>
        Medium = 2,

        /// <summary>
        /// High priority incident - requires urgent attention
        /// </summary>
        High = 3,

        /// <summary>
        /// Critical priority incident - requires immediate action
        /// </summary>
        Critical = 4
    }
}