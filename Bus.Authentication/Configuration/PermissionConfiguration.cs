namespace Bus.Authentication.Configuration
{
    /// <summary>
    /// Configuration options for the permission system
    /// </summary>
    public class PermissionConfiguration
    {
        public const string SectionName = "Permissions";

        /// <summary>
        /// When true, all permission checks return true (DANGEROUS - use only for debugging)
        /// </summary>
        public bool AllowAll { get; set; } = false;

        /// <summary>
        /// List of user IDs that bypass all permission checks (system administrators)
        /// </summary>
        public List<int> AdminUserIds { get; set; } = new List<int>();

        /// <summary>
        /// List of roles that bypass all permission checks
        /// </summary>
        public List<string> AdminRoles { get; set; } = new List<string> { "Admin" };

        /// <summary>
        /// Cache expiration time for user permissions (in minutes)
        /// </summary>
        public int CacheExpirationMinutes { get; set; } = 15;

        /// <summary>
        /// Enable detailed logging of permission checks
        /// </summary>
        public bool EnableDetailedLogging { get; set; } = false;

        /// <summary>
        /// When true, logs all permission denials for audit purposes
        /// </summary>
        public bool LogPermissionDenials { get; set; } = true;
    }
}