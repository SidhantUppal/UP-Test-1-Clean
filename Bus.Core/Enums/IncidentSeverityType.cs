namespace Bus.Core.Enums
{
    /// <summary>
    /// Incident severity types enumeration
    /// Values correspond to IncidentSeverityTypeID in V7.IncidentSeverityType table
    /// </summary>
    public enum IncidentSeverityType
    {
        Unknown = 0,

        /// <summary>
        /// Low severity incident with minimal impact
        /// </summary>
        Low = 1,

        /// <summary>
        /// Medium severity incident with moderate impact
        /// </summary>
        Medium = 2,

        /// <summary>
        /// High severity incident with significant impact
        /// </summary>
        High = 3,

        /// <summary>
        /// Critical severity incident with severe impact
        /// </summary>
        Critical = 4
    }
}