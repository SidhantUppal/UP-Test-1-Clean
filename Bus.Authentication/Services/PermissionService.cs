using Data.EntityFramework.Models;
using Data.EntityFramework;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Bus.Authentication.Configuration;

namespace Bus.Authentication.Services
{
    /// <summary>
    /// Service for checking user permissions with caching support
    /// </summary>
    public class PermissionService : IPermissionService
    {
        private readonly V7DBContext _dbContext;
        private readonly IMemoryCache _cache;
        private readonly ILogger<PermissionService> _logger;
        private readonly PermissionConfiguration _config;
        private readonly TimeSpan _cacheExpiration;

        public PermissionService(
            V7DBContext dbContext,
            IMemoryCache cache,
            ILogger<PermissionService> logger,
            IOptions<PermissionConfiguration> config)
        {
            _dbContext = dbContext;
            _cache = cache;
            _logger = logger;
            _config = config.Value;
            _cacheExpiration = TimeSpan.FromMinutes(_config.CacheExpirationMinutes);
        }

        public async Task<bool> UserHasPermissionAsync(int userId, string permissionName)
        {
            try
            {
                // Check for global AllowAll flag (for debugging)
                if (_config.AllowAll)
                {
                    if (_config.EnableDetailedLogging)
                    {
                        _logger.LogWarning("PERMISSION BYPASS: AllowAll flag is enabled - granting permission {Permission} to user {UserId}", permissionName, userId);
                    }
                    return true;
                }

                // Check if user is system admin (bypasses all permissions)
                if (await IsSystemAdminAsync(userId))
                {
                    if (_config.EnableDetailedLogging)
                    {
                        _logger.LogInformation("ADMIN BYPASS: User {UserId} is system admin - granting permission {Permission}", userId, permissionName);
                    }
                    return true;
                }

                // Normal permission check
                var userPermissions = await GetUserPermissionsAsync(userId);
                bool hasPermission = userPermissions.Contains(permissionName);

                // Log permission check result
                if (_config.EnableDetailedLogging || (!hasPermission && _config.LogPermissionDenials))
                {
                    if (hasPermission)
                    {
                        _logger.LogDebug("Permission granted: User {UserId} has permission {Permission}", userId, permissionName);
                    }
                    else
                    {
                        _logger.LogWarning("Permission denied: User {UserId} lacks permission {Permission}", userId, permissionName);
                    }
                }

                return hasPermission;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error checking permission {Permission} for user {UserId}", permissionName, userId);
                return false;
            }
        }

        public async Task<List<string>> GetUserPermissionsAsync(int userId)
        {
            string cacheKey = $"user_permissions_{userId}";

            if (_cache.TryGetValue(cacheKey, out List<string>? cachedPermissions) && cachedPermissions != null)
            {
                return cachedPermissions;
            }

            try
            {
                var permissions = new HashSet<string>();

                // Get user with their roles and tenant assignments
                var userWithRoles = await _dbContext.Users
                    .Include(u => u.UserRoles)
                        .ThenInclude(ur => ur.Role)
                    .Include(u => u.UserTenants)
                        .ThenInclude(ut => ut.Tenant)
                            .ThenInclude(t => t.TenantRolePermissions)
                                .ThenInclude(trp => trp.Permission)
                    .FirstOrDefaultAsync(u => u.UserID == userId && u.ArchivedDate == null);

                if (userWithRoles == null)
                {
                    _logger.LogWarning("User {UserId} not found or archived", userId);
                    return new List<string>();
                }

                // Get system-level permissions through user roles
                var userRoleIds = userWithRoles.UserRoles.Select(ur => ur.RoleID).ToList();
                var systemPermissions = await _dbContext.SystemRolePermissions
                    .Include(srp => srp.Permission)
                    .Where(srp => userRoleIds.Contains(srp.SystemRoleID))
                    .Select(srp => srp.Permission.Name)
                    .ToListAsync();

                foreach (var permission in systemPermissions)
                {
                    permissions.Add(permission);
                }

                // Get tenant-level permissions
                var tenantPermissions = userWithRoles.UserTenants
                    .SelectMany(ut => ut.Tenant.TenantRolePermissions)
                    .Where(trp => trp.IsGranted)
                    .Select(trp => trp.Permission.Name)
                    .ToList();

                foreach (var permission in tenantPermissions)
                {
                    permissions.Add(permission);
                }

                var result = permissions.ToList();

                // Cache the result
                _cache.Set(cacheKey, result, _cacheExpiration);

                _logger.LogDebug("Loaded {Count} permissions for user {UserId}", result.Count, userId);
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error loading permissions for user {UserId}", userId);
                return new List<string>();
            }
        }

        public void ClearUserPermissionCache(int userId)
        {
            string cacheKey = $"user_permissions_{userId}";
            _cache.Remove(cacheKey);
            _logger.LogDebug("Cleared permission cache for user {UserId}", userId);
        }

        public async Task<bool> UserHasTenantAccessAsync(int userId, int tenantId)
        {
            try
            {
                var hasAccess = await _dbContext.UserTenants
                    .AnyAsync(ut => ut.UserID == userId && ut.TenantID == tenantId);

                return hasAccess;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error checking tenant access for user {UserId} to tenant {TenantId}", userId, tenantId);
                return false;
            }
        }

        public async Task<bool> IsSystemAdminAsync(int userId)
        {
            try
            {
                // Check if user ID is in admin list
                if (_config.AdminUserIds.Contains(userId))
                {
                    return true;
                }

                // Check if user has admin roles
                if (_config.AdminRoles.Any())
                {
                    var userWithRoles = await _dbContext.Users
                        .Include(u => u.UserRoles)
                            .ThenInclude(ur => ur.Role)
                        .FirstOrDefaultAsync(u => u.UserID == userId && u.ArchivedDate == null);

                    if (userWithRoles != null)
                    {
                        var userRoleNames = userWithRoles.UserRoles
                            .Select(ur => ur.Role.Description)
                            .ToList();

                        return _config.AdminRoles.Any(adminRole => userRoleNames.Contains(adminRole));
                    }
                }

                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error checking if user {UserId} is system admin", userId);
                return false;
            }
        }

        public object GetPermissionSystemStatus()
        {
            return new
            {
                AllowAll = _config.AllowAll,
                AdminUserIds = _config.AdminUserIds,
                AdminRoles = _config.AdminRoles,
                CacheExpirationMinutes = _config.CacheExpirationMinutes,
                EnableDetailedLogging = _config.EnableDetailedLogging,
                LogPermissionDenials = _config.LogPermissionDenials,
                SystemWarning = _config.AllowAll ? "⚠️ SECURITY WARNING: AllowAll is enabled - all permission checks will pass!" : null
            };
        }
    }
}