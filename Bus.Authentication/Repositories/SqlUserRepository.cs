using Bus.Authentication.Models;
using Bus.Authentication.Services;
using Data.EntityFramework;
using Data.EntityFramework.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Bus.Authentication.Repositories;

public class SqlUserRepository : IUserRepository
{
    private readonly V7DBContext _context;
    private readonly ILogger<SqlUserRepository> _logger;

    public SqlUserRepository(V7DBContext context, ILogger<SqlUserRepository> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<UserInfo?> GetUserByUsernameAsync(string username)
    {
        try
        {
            var user = await _context.Users
                .AsNoTracking()
                .Where(u => u.Username == username && u.ArchivedDate == null)
                .FirstOrDefaultAsync();

            return user != null ? MapToUserInfo(user) : null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting user by username: {Username}", username);
            return null;
        }
    }

    public async Task<UserInfo?> GetUserByEmailAsync(string email)
    {
        try
        {
            var user = await _context.Users
                .AsNoTracking()
                .Where(u => u.Email == email && u.ArchivedDate == null)
                .FirstOrDefaultAsync();

            return user != null ? MapToUserInfo(user) : null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting user by email: {Email}", email);
            return null;
        }
    }

    public async Task<UserInfo?> GetUserByEntraObjectIdAsync(string entraObjectId)
    {
        try
        {
            var user = await _context.Users
                .AsNoTracking()
                .Where(u => u.AzureADObjectId == entraObjectId && u.ArchivedDate == null)
                .FirstOrDefaultAsync();

            return user != null ? MapToUserInfo(user) : null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting user by Entra Object ID: {ObjectId}", entraObjectId);
            return null;
        }
    }

    public async Task<UserInfo?> GetUserByAzureObjectIdAsync(string azureObjectId)
    {
        try
        {
            var user = await _context.Users
                .AsNoTracking()
                .Where(u => u.AzureADObjectId == azureObjectId && u.ArchivedDate == null)
                .FirstOrDefaultAsync();

            return user != null ? MapToUserInfo(user) : null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting user by Azure Object ID: {ObjectId}", azureObjectId);
            return null;
        }
    }

    public async Task<UserInfo?> GetUserByIdAsync(int userId)
    {
        try
        {
            var user = await _context.Users
                .AsNoTracking()
                .Where(u => u.UserID == userId && u.ArchivedDate == null)
                .FirstOrDefaultAsync();

            return user != null ? MapToUserInfo(user) : null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting user by ID: {UserId}", userId);
            return null;
        }
    }

    public async Task<UserInfo> CreateUserAsync(CreateUserRequest request)
    {
        try
        {
            var user = new User
            {
                GUID = Guid.NewGuid(),
                FullName = request.FullName,
                Email = request.Email,
                Username = request.Username,
                PasswordHash = request.PasswordHash,
                PasswordSalt = request.PasswordSalt,
                AzureADObjectId = request.AzureADObjectId,
                MasterUserAreaID = request.MasterUserAreaID,
                EmailVerified = request.EmailVerified,
                CreatedByUserID = request.CreatedByUserID,
                CreatedDate = DateTimeOffset.UtcNow,
                IsMobileAppUser = true,
                HasReadDisclaimer = false,
                IsLocked = false,
                FailedLoginAttempts = 0,
                TwoFactorEnabled = false
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Created new user: {Email} (ID: {UserId})", request.Email, user.UserID);
            return MapToUserInfo(user);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating user: {Email}", request.Email);
            throw;
        }
    }

    public async Task<bool> UpdateUserAsync(int userId, UpdateUserRequest request)
    {
        try
        {
            var user = await _context.Users
                .Where(u => u.UserID == userId && u.ArchivedDate == null)
                .FirstOrDefaultAsync();

            if (user == null)
                return false;

            if (request.FullName != null) user.FullName = request.FullName;
            if (request.Email != null) user.Email = request.Email;
            if (request.IsLocked.HasValue) user.IsLocked = request.IsLocked.Value;
            if (request.LockedMessage != null) user.LockedMessage = request.LockedMessage;
            if (request.EmailVerified.HasValue) user.EmailVerified = request.EmailVerified.Value;
            if (request.TwoFactorEnabled.HasValue) user.TwoFactorEnabled = request.TwoFactorEnabled.Value;

            user.ModifiedByUserID = request.ModifiedByUserID;
            user.ModifiedDate = DateTimeOffset.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating user: {UserId}", userId);
            return false;
        }
    }

    public async Task<bool> UpdateLastLoginAsync(int userId, string? ipAddress = null)
    {
        try
        {
            var user = await _context.Users
                .Where(u => u.UserID == userId && u.ArchivedDate == null)
                .FirstOrDefaultAsync();

            if (user == null)
                return false;

            user.LastLoginAt = DateTimeOffset.UtcNow;
            user.LastLoginDate = DateTimeOffset.UtcNow; // Keep both for compatibility
            if (ipAddress != null) user.IPAddress = ipAddress;

            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating last login for user: {UserId}", userId);
            return false;
        }
    }

    public async Task<bool> UpdatePasswordAsync(int userId, string passwordHash, string salt)
    {
        try
        {
            var user = await _context.Users
                .Where(u => u.UserID == userId && u.ArchivedDate == null)
                .FirstOrDefaultAsync();

            if (user == null)
                return false;

            user.PasswordHash = passwordHash;
            user.PasswordSalt = salt;
            user.LastPasswordChange = DateTimeOffset.UtcNow;
            user.FailedLoginAttempts = 0; // Reset failed attempts on password change
            user.ModifiedDate = DateTimeOffset.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating password for user: {UserId}", userId);
            return false;
        }
    }

    public async Task<bool> IncrementFailedLoginAttemptsAsync(int userId)
    {
        try
        {
            var user = await _context.Users
                .Where(u => u.UserID == userId && u.ArchivedDate == null)
                .FirstOrDefaultAsync();

            if (user == null)
                return false;

            user.FailedLoginAttempts++;
            user.ModifiedDate = DateTimeOffset.UtcNow;

            // Lock account after 5 failed attempts
            if (user.FailedLoginAttempts >= 5)
            {
                user.IsLocked = true;
                user.LockedMessage = $"Account locked due to {user.FailedLoginAttempts} failed login attempts";
                _logger.LogWarning("User account locked due to failed login attempts: {UserId}", userId);
            }

            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error incrementing failed login attempts for user: {UserId}", userId);
            return false;
        }
    }

    public async Task<bool> ResetFailedLoginAttemptsAsync(int userId)
    {
        try
        {
            var user = await _context.Users
                .Where(u => u.UserID == userId && u.ArchivedDate == null)
                .FirstOrDefaultAsync();

            if (user == null)
                return false;

            user.FailedLoginAttempts = 0;
            user.ModifiedDate = DateTimeOffset.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error resetting failed login attempts for user: {UserId}", userId);
            return false;
        }
    }

    public async Task<List<string>> GetUserRolesAsync(int userId, int? userAreaId = null)
    {
        try
        {
            var query = _context.UserRoles
                .AsNoTracking()
                .Where(ur => ur.UserID == userId);

            if (userAreaId.HasValue)
            {
                query = query.Where(ur => ur.UserAreaID == userAreaId.Value);
            }

            var roleIds = await query
                .Select(ur => ur.RoleID)
                .ToListAsync();

            if (!roleIds.Any())
                return new List<string> { "User" }; // Default role

            var roleDescriptions = await _context.Roles
                .AsNoTracking()
                .Where(r => roleIds.Contains(r.RoleID) && r.ArchivedDate == null)
                .Select(r => r.Description ?? $"Role_{r.RoleID}")
                .ToListAsync();

            // Add admin role if any role is marked as administrator
            var hasAdminRole = await _context.Roles
                .AsNoTracking()
                .Where(r => roleIds.Contains(r.RoleID) && r.IsAdministrator)
                .AnyAsync();

            if (hasAdminRole && !roleDescriptions.Contains("Admin"))
            {
                roleDescriptions.Add("Admin");
            }

            return roleDescriptions.Any() ? roleDescriptions : new List<string> { "User" };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting user roles for user: {UserId}", userId);
            return new List<string> { "User" };
        }
    }

    public async Task<int> CreateUserAsync(UserInfo userInfo)
    {
        try
        {
            var user = new User
            {
                GUID = Guid.NewGuid(),
                FullName = userInfo.FullName,
                Email = userInfo.Email,
                Username = userInfo.Username,
                AzureADObjectId = userInfo.AzureObjectId,
                MasterUserAreaID = userInfo.UserAreaId,
                EmailVerified = userInfo.EmailVerified,
                CreatedByUserID = 1, // System user
                CreatedDate = DateTimeOffset.UtcNow,
                IsMobileAppUser = true,
                HasReadDisclaimer = false,
                IsLocked = false,
                FailedLoginAttempts = 0,
                TwoFactorEnabled = false
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Created new user: {Email} (ID: {UserId})", userInfo.Email, user.UserID);
            return user.UserID;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating user: {Email}", userInfo.Email);
            throw;
        }
    }

    public async Task<bool> UpdateUserAsync(UserInfo userInfo)
    {
        try
        {
            var user = await _context.Users
                .Where(u => u.UserID == userInfo.UserId)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                _logger.LogWarning("User not found for update: {UserId}", userInfo.UserId);
                return false;
            }

            // Update fields
            user.FullName = userInfo.FullName;
            user.Email = userInfo.Email;
            user.EmailVerified = userInfo.EmailVerified;
            user.AzureADObjectId = userInfo.AzureObjectId;
            user.ModifiedDate = DateTimeOffset.UtcNow;
            user.ModifiedByUserID = 1; // System user

            await _context.SaveChangesAsync();

            _logger.LogInformation("Updated user: {UserId}", userInfo.UserId);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating user: {UserId}", userInfo.UserId);
            return false;
        }
    }

    private static UserInfo MapToUserInfo(User user)
    {
        return new UserInfo
        {
            UserId = user.UserID,
            Username = user.Username ?? string.Empty,
            Email = user.Email ?? string.Empty,
            FullName = user.FullName,
            UserAreaId = user.MasterUserAreaID,
            IsLocked = user.IsLocked,
            PasswordHash = user.PasswordHash,
            PasswordSalt = user.PasswordSalt,
            FailedLoginAttempts = user.FailedLoginAttempts,
            EmailVerified = user.EmailVerified,
            TwoFactorEnabled = user.TwoFactorEnabled,
            LastLoginAt = user.LastLoginAt,
            AzureADObjectId = user.AzureADObjectId,
            AzureObjectId = user.AzureADObjectId, // Map to both properties for compatibility
            Roles = new List<string>() // Will be populated separately
        };
    }
}