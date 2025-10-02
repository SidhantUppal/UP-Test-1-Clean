namespace Bus.Core.Enums
{
    /// <summary>
    /// Incident category types enumeration
    /// Values correspond to IncidentCategoryTypeID in V7.IncidentCategoryType table
    /// </summary>
    public enum IncidentCategoryType
    {
        /// <summary>
        /// Safety-related incidents and near misses
        /// </summary>
        Safety = 1,

        /// <summary>
        /// Human resources and personnel incidents
        /// </summary>
        HR = 2,

        /// <summary>
        /// Cybersecurity and data protection incidents
        /// </summary>
        Cyber = 3,

        /// <summary>
        /// Whistleblowing and ethics concerns
        /// </summary>
        Whistleblowing = 4
    }
}