namespace Bus.Authentication.Services
{
    /// <summary>
    /// Service for checking user permissions with caching support
    /// </summary>
    public interface IPermissionService
    {
        /// <summary>
        /// Checks if a user has a specific permission
        /// </summary>
        /// <param name="userId">The user ID</param>
        /// <param name="permissionName">The permission name (e.g., "INCIDENT_CREATE")</param>
        /// <returns>True if user has permission, false otherwise</returns>
        Task<bool> UserHasPermissionAsync(int userId, string permissionName);

        /// <summary>
        /// Gets all permissions for a user (with caching)
        /// </summary>
        /// <param name="userId">The user ID</param>
        /// <returns>List of permission names the user has</returns>
        Task<List<string>> GetUserPermissionsAsync(int userId);

        /// <summary>
        /// Clears permission cache for a user (call when user roles change)
        /// </summary>
        /// <param name="userId">The user ID</param>
        void ClearUserPermissionCache(int userId);

        /// <summary>
        /// Checks if user has permission to access a specific tenant/user area
        /// </summary>
        /// <param name="userId">The user ID</param>
        /// <param name="tenantId">The tenant/user area ID</param>
        /// <returns>True if user has access to the tenant</returns>
        Task<bool> UserHasTenantAccessAsync(int userId, int tenantId);

        /// <summary>
        /// Checks if a user is a system administrator (bypasses all permission checks)
        /// </summary>
        /// <param name="userId">The user ID</param>
        /// <returns>True if user is a system admin</returns>
        Task<bool> IsSystemAdminAsync(int userId);

        /// <summary>
        /// Gets the current permission system status (for debugging/monitoring)
        /// </summary>
        /// <returns>Object containing permission system status</returns>
        object GetPermissionSystemStatus();
    }
}