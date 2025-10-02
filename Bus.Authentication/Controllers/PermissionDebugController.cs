using Microsoft.AspNetCore.Mvc;
using Bus.Authentication.Services;
using System.Security.Claims;

namespace Bus.Authentication.Controllers
{
    /// <summary>
    /// Debug controller for permission system monitoring and testing
    /// Should be secured or disabled in production
    /// </summary>
    [ApiController]
    [Route("api/debug/permissions")]
    public class PermissionDebugController : AuthenticatedControllerBase
    {
        /// <summary>
        /// Gets the current permission system status
        /// </summary>
        [HttpGet("status")]
        public IActionResult GetPermissionSystemStatus()
        {
            var status = PermissionService.GetPermissionSystemStatus();
            return Ok(status);
        }

        /// <summary>
        /// Checks if current user has a specific permission
        /// </summary>
        [HttpGet("check/{permissionName}")]
        public async Task<IActionResult> CheckCurrentUserPermission(string permissionName)
        {
            try
            {
                var userId = GetCurrentUserId();
                var hasPermission = await PermissionService.UserHasPermissionAsync(userId, permissionName);
                var isAdmin = await PermissionService.IsSystemAdminAsync(userId);

                return Ok(new
                {
                    UserId = userId,
                    UserEmail = GetCurrentUserEmail(),
                    PermissionName = permissionName,
                    HasPermission = hasPermission,
                    IsSystemAdmin = isAdmin,
                    UserRoles = GetCurrentUserRoles()
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }

        /// <summary>
        /// Gets all permissions for current user
        /// </summary>
        [HttpGet("my-permissions")]
        public async Task<IActionResult> GetCurrentUserPermissions()
        {
            try
            {
                var userId = GetCurrentUserId();
                var permissions = await PermissionService.GetUserPermissionsAsync(userId);
                var isAdmin = await PermissionService.IsSystemAdminAsync(userId);

                return Ok(new
                {
                    UserId = userId,
                    UserEmail = GetCurrentUserEmail(),
                    UserRoles = GetCurrentUserRoles(),
                    IsSystemAdmin = isAdmin,
                    Permissions = permissions.OrderBy(p => p).ToList(),
                    PermissionCount = permissions.Count
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }

        /// <summary>
        /// Clears permission cache for current user
        /// </summary>
        [HttpPost("clear-cache")]
        public IActionResult ClearCurrentUserCache()
        {
            try
            {
                var userId = GetCurrentUserId();
                PermissionService.ClearUserPermissionCache(userId);

                return Ok(new
                {
                    Message = $"Permission cache cleared for user {userId}",
                    UserId = userId
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }

        /// <summary>
        /// Checks tenant access for current user
        /// </summary>
        [HttpGet("tenant-access/{tenantId}")]
        public async Task<IActionResult> CheckTenantAccess(int tenantId)
        {
            try
            {
                var userId = GetCurrentUserId();
                var hasAccess = await PermissionService.UserHasTenantAccessAsync(userId, tenantId);

                return Ok(new
                {
                    UserId = userId,
                    TenantId = tenantId,
                    HasAccess = hasAccess
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }
    }
}