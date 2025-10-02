using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;
using Data.EntityFramework;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;

namespace Bus.Authentication.Authorization
{
    /// <summary>
    /// Custom authorization attribute that checks database permissions dynamically
    /// No code deployment needed - permissions managed in database
    /// </summary>
    public class RequirePermissionAttribute : TypeFilterAttribute
    {
        public RequirePermissionAttribute(Core.Enums.Permission permission)
            : base(typeof(PermissionAuthorizationFilter))
        {
            Arguments = new object[] { (int)permission };
        }

        public RequirePermissionAttribute(string permissionName)
            : base(typeof(PermissionAuthorizationFilter))
        {
            Arguments = new object[] { permissionName };
        }
    }

    /// <summary>
    /// Authorization filter that performs the actual permission check
    /// </summary>
    public class PermissionAuthorizationFilter : IAsyncAuthorizationFilter
    {
        private readonly object _permission;

        public PermissionAuthorizationFilter(object permission)
        {
            _permission = permission;
        }

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            // Check if user is authenticated
            if (!context.HttpContext.User.Identity?.IsAuthenticated ?? true)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            try
            {
                // Get configuration from DI
                var configuration = context.HttpContext.RequestServices.GetRequiredService<IConfiguration>();

                // Check AllowAll flag first
                bool allowAll = configuration.GetValue<bool>("Permissions:AllowAll", false);
                if (allowAll)
                {
                    return; // Allow access without checking permissions
                }
                // Get user information from claims
                var userIdClaim = context.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                {
                    context.Result = new UnauthorizedResult();
                    return;
                }

                // Get database context from DI
                var dbContext = context.HttpContext.RequestServices.GetRequiredService<V7DBContext>();

                // Check if user has the required permission
                bool hasPermission = await CheckUserPermissionAsync(dbContext, userId, _permission);

                if (!hasPermission)
                {
                    context.Result = new ForbidResult($"Access denied. Required permission: {_permission}");
                    return;
                }
            }
            catch (Exception)
            {
                // Log the exception in production
                context.Result = new StatusCodeResult(500);
                return;
            }
        }

        /// <summary>
        /// Checks if a user has a specific permission by checking their roles and tenant permissions
        /// </summary>
        private async Task<bool> CheckUserPermissionAsync(V7DBContext dbContext, int userId, object permission)
        {
            // Get user with their roles and tenant assignments
            var userWithRoles = await dbContext.Users
                .Include(u => u.UserRoles)
                    .ThenInclude(ur => ur.Role)
                .Include(u => u.UserTenants)
                    .ThenInclude(ut => ut.Tenant)
                        .ThenInclude(t => t.TenantRolePermissions)
                            .ThenInclude(trp => trp.Permission)
                .FirstOrDefaultAsync(u => u.UserID == userId && u.ArchivedDate == null);

            if (userWithRoles == null)
                return false;

            // Determine if permission is ID (int) or Name (string)
            bool isPermissionId = permission is int;
            int? permissionId = isPermissionId ? (int)permission : null;
            string? permissionName = isPermissionId ? null : permission?.ToString();

            // Check system-level permissions through user roles
            var systemPermissionQuery = dbContext.SystemRolePermissions
                .Include(srp => srp.Permission)
                .Where(srp => userWithRoles.UserRoles.Any(ur => ur.RoleID == srp.SystemRoleID));

            bool systemPermission;
            if (isPermissionId && permissionId.HasValue)
            {
                systemPermission = await systemPermissionQuery
                    .Where(srp => srp.PermissionID == permissionId.Value)
                    .AnyAsync();
            }
            else
            {
                systemPermission = await systemPermissionQuery
                    .Where(srp => srp.Permission.Name == permissionName)
                    .AnyAsync();
            }

            if (systemPermission)
                return true;

            // Check tenant-level permissions
            bool tenantPermission;
            if (isPermissionId && permissionId.HasValue)
            {
                tenantPermission = userWithRoles.UserTenants
                    .SelectMany(ut => ut.Tenant.TenantRolePermissions)
                    .Any(trp => trp.PermissionID == permissionId.Value && trp.IsGranted);
            }
            else
            {
                tenantPermission = userWithRoles.UserTenants
                    .SelectMany(ut => ut.Tenant.TenantRolePermissions)
                    .Any(trp => trp.Permission.Name == permissionName && trp.IsGranted);
            }

            return tenantPermission;
        }
    }
}