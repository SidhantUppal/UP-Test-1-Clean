using Microsoft.AspNetCore.Mvc;
using Bus.Authentication.Controllers;

namespace Api.SysAdmin.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SysAdminController : AuthenticatedControllerBase
    {
        private readonly ILogger<SysAdminController> _logger;

        public SysAdminController(ILogger<SysAdminController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "health")]
        public IActionResult Get()
        {
            return Ok("SysAdmin is healthy");
        }

        /// <summary>
        /// Gets the current permission system status for debugging
        /// </summary>
        [HttpGet("debug/permissions/status")]
        public IActionResult GetPermissionSystemStatus()
        {
            try
            {
                var status = PermissionService.GetPermissionSystemStatus();
                return Ok(status);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting permission system status");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        /// <summary>
        /// Gets all permissions for current user for debugging
        /// </summary>
        [HttpGet("debug/permissions/my-permissions")]
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
                _logger.LogError(ex, "Error getting user permissions for user");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        /// <summary>
        /// Checks if current user has a specific permission for debugging
        /// </summary>
        [HttpGet("debug/permissions/check/{permissionName}")]
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
                _logger.LogError(ex, "Error checking permission {Permission} for user", permissionName);
                return StatusCode(500, new { error = ex.Message });
            }
        }

        /// <summary>
        /// Clears permission cache for current user for debugging
        /// </summary>
        [HttpPost("debug/permissions/clear-cache")]
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
                _logger.LogError(ex, "Error clearing permission cache for user");
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}
