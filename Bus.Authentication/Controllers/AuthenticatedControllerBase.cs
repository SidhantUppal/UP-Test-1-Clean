using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Bus.Authentication.Services;
using Microsoft.Extensions.DependencyInjection;
using Data.EntityFramework;
using Data.EntityFramework.Models;
using Microsoft.EntityFrameworkCore;

namespace Bus.Authentication.Controllers
{
    /// <summary>
    /// Base controller that provides authenticated user session information
    /// Inherit from this class to access current user data from JWT claims
    /// </summary>
    [Authorize]
    public abstract class AuthenticatedControllerBase : ControllerBase
    {
        private IPermissionService? _permissionService;
        private UserSession? _userSession;
        private User? _userEntity;

        /// <summary>
        /// Permission service for checking user permissions
        /// </summary>
        protected IPermissionService PermissionService =>
            _permissionService ??= HttpContext.RequestServices.GetRequiredService<IPermissionService>();
        /// <summary>
        /// Gets the current authenticated user's ID from JWT token claims
        /// </summary>
        /// <returns>The current user's ID</returns>
        /// <exception cref="UnauthorizedAccessException">Thrown when user ID cannot be found in token claims</exception>
        protected int GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                throw new UnauthorizedAccessException("User ID not found in token claims");
            }
            return userId;
        }

        /// <summary>
        /// Gets the current authenticated user's email from JWT token claims
        /// </summary>
        /// <returns>The current user's email, or null if not found</returns>
        protected string? GetCurrentUserEmail()
        {
            return User.FindFirst(ClaimTypes.Email)?.Value;
        }

        /// <summary>
        /// Gets the current authenticated user's roles from JWT token claims
        /// </summary>
        /// <returns>List of role names for the current user</returns>
        protected List<string> GetCurrentUserRoles()
        {
            return User.FindAll(ClaimTypes.Role).Select(c => c.Value).ToList();
        }

        /// <summary>
        /// Gets the current authenticated user's full name from JWT token claims
        /// </summary>
        /// <returns>The current user's full name, or null if not found</returns>
        protected string? GetCurrentUserName()
        {
            return User.FindFirst(ClaimTypes.Name)?.Value;
        }

        /// <summary>
        /// Checks if the current user has a specific role
        /// </summary>
        /// <param name="role">The role name to check</param>
        /// <returns>True if the user has the role, false otherwise</returns>
        protected bool UserHasRole(string role)
        {
            return User.IsInRole(role);
        }

        /// <summary>
        /// Gets a custom claim value from the current user's token
        /// </summary>
        /// <param name="claimType">The claim type to retrieve</param>
        /// <returns>The claim value, or null if not found</returns>
        protected string? GetUserClaim(string claimType)
        {
            return User.FindFirst(claimType)?.Value;
        }

        /// <summary>
        /// Gets the current authenticated user's master user area ID from JWT token claims
        /// </summary>
        /// <returns>The current user's master user area ID, or 1 as default if not found</returns>
        protected int GetCurrentUserMasterUserAreaId()
        {
            var userAreaIdClaim = User.FindFirst("MasterUserAreaID")?.Value;
            if (string.IsNullOrEmpty(userAreaIdClaim) || !int.TryParse(userAreaIdClaim, out int userAreaId))
            {
                // Default to user area 1 if not found in claims
                return 1;
            }
            return userAreaId;
        }

        /// <summary>
        /// Checks if the current user has a specific permission
        /// </summary>
        /// <param name="permissionName">The permission name to check</param>
        /// <returns>True if user has permission, false otherwise</returns>
        protected async Task<bool> UserHasPermissionAsync(string permissionName)
        {
            return await PermissionService.UserHasPermissionAsync(GetCurrentUserId(), permissionName);
        }

        /// <summary>
        /// Ensures the current user has a specific permission, throws UnauthorizedAccessException if not
        /// </summary>
        /// <param name="permissionName">The permission name to require</param>
        /// <exception cref="UnauthorizedAccessException">Thrown when user lacks required permission</exception>
        protected async Task RequirePermissionAsync(string permissionName)
        {
            if (!await UserHasPermissionAsync(permissionName))
            {
                throw new UnauthorizedAccessException($"Access denied. Required permission: {permissionName}");
            }
        }

        /// <summary>
        /// Checks if current user has access to a specific tenant/user area
        /// </summary>
        /// <param name="tenantId">The tenant/user area ID</param>
        /// <returns>True if user has access, false otherwise</returns>
        protected async Task<bool> UserHasTenantAccessAsync(int tenantId)
        {
            return await PermissionService.UserHasTenantAccessAsync(GetCurrentUserId(), tenantId);
        }

        /// <summary>
        /// Gets the complete user session information in a single efficient call
        /// </summary>
        /// <returns>UserSession with all user information from JWT claims</returns>
        /// <exception cref="UnauthorizedAccessException">Thrown when user ID cannot be found in token claims</exception>
        private UserSession GetUserSession()
        {
            // Extract user ID (required)
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                throw new UnauthorizedAccessException("User ID not found in token claims");
            }

            // Extract MasterUserAreaID with fallback to 1
            var userAreaIdClaim = User.FindFirst("MasterUserAreaID")?.Value;
            var masterUserAreaId = 1; // Default value
            if (!string.IsNullOrEmpty(userAreaIdClaim) && int.TryParse(userAreaIdClaim, out int parsedUserAreaId))
            {
                masterUserAreaId = parsedUserAreaId;
            }

            // Build and return the complete session
            return new UserSession
            {
                UserId = userId,
                Email = User.FindFirst(ClaimTypes.Email)?.Value,
                Name = User.FindFirst(ClaimTypes.Name)?.Value,
                Roles = User.FindAll(ClaimTypes.Role).Select(c => c.Value).ToList(),
                MasterUserAreaID = masterUserAreaId
            };
        }

        /// <summary>
        /// Gets the full EF User entity with all navigation properties loaded
        /// Cached per request for optimal performance
        /// </summary>
        protected User UserEntity => _userEntity ??= GetUserEntityAsync().Result;

        /// <summary>
        /// Gets the full EF User entity asynchronously with all navigation properties loaded
        /// Cached per request for optimal performance
        /// </summary>
        protected async Task<User> GetUserEntityAsync()
        {
            if (_userEntity != null)
                return _userEntity;

            var userId = GetCurrentUserId();

            using var context = new V7DBContext();

            _userEntity = await context.Users
                .Include(u => u.MasterUserArea)                    // User's master user area
                .Include(u => u.UserRoles)                         // User's roles
                    .ThenInclude(ur => ur.Role)                    // Role details
                        .ThenInclude(r => r!.RolePermissions)      // Role permissions
                            .ThenInclude(rp => rp.Permission)      // Permission details
                .Include(u => u.UserRoles)                         // Load user area for each role
                    .ThenInclude(ur => ur.UserArea)                // UserArea for each role
                .AsNoTracking()                                     // Read-only for performance
                .FirstOrDefaultAsync(u => u.UserID == userId);

            if (_userEntity == null)
                throw new UnauthorizedAccessException($"User with ID {userId} not found in database");

            return _userEntity;
        }

        /// <summary>
        /// Gets user's permissions efficiently from loaded EF entity
        /// </summary>
        protected async Task<List<string>> GetUserPermissionsAsync()
        {
            var user = await GetUserEntityAsync();
            return user.UserRoles
                .Where(ur => ur.Role?.RolePermissions != null)
                .SelectMany(ur => ur.Role!.RolePermissions)
                .Where(rp => rp.Permission != null)
                .Select(rp => rp.Permission!.Key)
                .Distinct()
                .ToList();
        }

        /// <summary>
        /// Checks if user has specific permission using loaded EF entity
        /// </summary>
        protected async Task<bool> UserHasPermissionFromEntityAsync(string permissionName)
        {
            var permissions = await GetUserPermissionsAsync();
            return permissions.Contains(permissionName);
        }

        /// <summary>
        /// Gets user's roles efficiently from loaded EF entity
        /// </summary>
        protected async Task<List<string>> GetUserRoleNamesAsync()
        {
            var user = await GetUserEntityAsync();
            return user.UserRoles
                .Where(ur => ur.Role != null)
                .Select(ur => ur.Role!.Description ?? $"Role-{ur.Role.RoleID}")
                .Where(roleName => !string.IsNullOrEmpty(roleName))
                .ToList();
        }

        /// <summary>
        /// Provides convenient access to current user session information
        /// Cached per request for optimal performance
        /// </summary>
        protected UserSession UserSession => _userSession ??= GetUserSession();
    }

    /// <summary>
    /// Represents the current user's session information
    /// </summary>
    public class UserSession
    {
        public int UserId { get; set; }
        public string? Email { get; set; }
        public string? Name { get; set; }
        public List<string> Roles { get; set; } = new List<string>();
        public int MasterUserAreaID { get; set; }
    }
}