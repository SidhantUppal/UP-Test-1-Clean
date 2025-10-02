using Bus.Authentication.Models;
using Bus.Authentication.Services;
using Data.EntityFramework;
using Data.EntityFramework.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;

namespace Bus.Authentication.Repositories;

public class SqlApiKeyRepository : IApiKeyRepository
{
    private readonly V7DBContext _context;
    private readonly ILogger<SqlApiKeyRepository> _logger;
    private readonly IServiceScopeFactory _serviceScopeFactory;

    public SqlApiKeyRepository(V7DBContext context, ILogger<SqlApiKeyRepository> logger, IServiceScopeFactory serviceScopeFactory)
    {
        _context = context;
        _logger = logger;
        _serviceScopeFactory = serviceScopeFactory;
    }

    public async Task<UserInfo?> ValidateApiKeyAsync(string apiKey)
    {
        try
        {
            if (string.IsNullOrEmpty(apiKey) || apiKey.Length < 10)
                return null;

            // Extract prefix from API key (first 12 characters for t100_ keys)
            var keyPrefix = apiKey.Length > 12 && apiKey.StartsWith("t100_") 
                ? apiKey.Substring(0, 12) 
                : apiKey.Substring(0, Math.Min(8, apiKey.Length));

            // Hash the full API key for comparison
            var keyHash = ComputeApiKeyHash(apiKey);
            
            _logger.LogInformation("[DEBUG] API Key validation - Key: '{ApiKey}', Prefix: '{KeyPrefix}', Computed Hash: '{KeyHash}'", 
                apiKey, keyPrefix, keyHash);

            var apiKeyRecord = await _context.ApiKeys
                .AsNoTracking()
                .Where(ak => ak.KeyPrefix == keyPrefix 
                            && ak.KeyHash == keyHash 
                            && ak.IsActive 
                            && ak.ArchivedDate == null
                            && (ak.ExpiresAt == null || ak.ExpiresAt > DateTimeOffset.UtcNow))
                .FirstOrDefaultAsync();

            if (apiKeyRecord == null)
            {
                _logger.LogWarning("Invalid or expired API key used with prefix: {KeyPrefix}", keyPrefix);
                return null;
            }

            // Get the associated user
            var user = await _context.Users
                .AsNoTracking()
                .Where(u => u.UserID == apiKeyRecord.UserID && u.ArchivedDate == null && !u.IsLocked)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                _logger.LogWarning("API key associated with invalid user: {UserId}", apiKeyRecord.UserID);
                return null;
            }

            // Update usage tracking (fire and forget with separate context)
            _ = Task.Run(async () =>
            {
                try
                {
                    using var scope = _serviceScopeFactory.CreateScope();
                    var context = scope.ServiceProvider.GetRequiredService<V7DBContext>();
                    await UpdateApiKeyUsageAsync(apiKeyRecord.ApiKeyID, context);
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Failed to update API key usage for key: {KeyId}", apiKeyRecord.ApiKeyID);
                }
            });

            // Load user roles
            var roles = await GetUserRolesAsync(user.UserID, user.MasterUserAreaID);

            // Add API-specific roles from scopes
            if (!string.IsNullOrEmpty(apiKeyRecord.Scopes))
            {
                var scopes = apiKeyRecord.Scopes.Split(',', StringSplitOptions.RemoveEmptyEntries);
                foreach (var scope in scopes)
                {
                    if (!roles.Contains(scope.Trim()))
                        roles.Add(scope.Trim());
                }
            }

            var userInfo = new UserInfo
            {
                UserId = user.UserID,
                Username = user.Username ?? $"api-user-{user.UserID}",
                Email = user.Email ?? string.Empty,
                FullName = user.FullName,
                UserAreaId = user.MasterUserAreaID,
                IsLocked = user.IsLocked,
                EmailVerified = user.EmailVerified,
                Roles = roles
            };

            _logger.LogInformation("Valid API key used for user: {UserId} (Key: {KeyName})", 
                user.UserID, apiKeyRecord.KeyName);

            return userInfo;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error validating API key");
            return null;
        }
    }

    public async Task<ApiKeyInfo> CreateApiKeyAsync(CreateApiKeyRequest request)
    {
        try
        {
            var apiKey = new ApiKey
            {
                GUID = Guid.NewGuid(),
                UserID = request.UserID,
                KeyName = request.KeyName,
                KeyHash = request.KeyHash,
                KeyPrefix = request.KeyPrefix,
                Scopes = request.Scopes,
                ExpiresAt = request.ExpiresAt,
                IPRestrictions = request.IPRestrictions,
                RateLimitRequests = request.RateLimitRequests,
                RateLimitWindow = request.RateLimitWindow,
                IsActive = true,
                UsageCount = 0,
                CreatedByUserID = request.CreatedByUserID,
                CreatedDate = DateTimeOffset.UtcNow
            };

            _context.ApiKeys.Add(apiKey);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Created new API key: {KeyName} for user: {UserId}", 
                request.KeyName, request.UserID);

            return new ApiKeyInfo
            {
                ApiKeyID = apiKey.ApiKeyID,
                KeyName = apiKey.KeyName,
                KeyPrefix = apiKey.KeyPrefix,
                Scopes = apiKey.Scopes,
                IsActive = apiKey.IsActive,
                ExpiresAt = apiKey.ExpiresAt?.DateTime,
                LastUsedAt = null,
                UsageCount = 0,
                CreatedDate = apiKey.CreatedDate.DateTime
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating API key: {KeyName}", request.KeyName);
            throw;
        }
    }

    public async Task<bool> RevokeApiKeyAsync(string keyPrefix, int userId)
    {
        try
        {
            var apiKey = await _context.ApiKeys
                .Where(ak => ak.KeyPrefix == keyPrefix 
                            && ak.UserID == userId 
                            && ak.IsActive 
                            && ak.ArchivedDate == null)
                .FirstOrDefaultAsync();

            if (apiKey == null)
                return false;

            apiKey.IsActive = false;
            apiKey.ModifiedDate = DateTimeOffset.UtcNow;

            await _context.SaveChangesAsync();

            _logger.LogInformation("Revoked API key: {KeyName} for user: {UserId}", 
                apiKey.KeyName, userId);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error revoking API key with prefix: {KeyPrefix}", keyPrefix);
            return false;
        }
    }

    public async Task<bool> UpdateApiKeyUsageAsync(int apiKeyId)
    {
        return await UpdateApiKeyUsageAsync(apiKeyId, _context);
    }

    private async Task<bool> UpdateApiKeyUsageAsync(int apiKeyId, V7DBContext context)
    {
        try
        {
            // Use raw SQL to avoid loading the entity (more efficient for high-frequency updates)
            await context.Database.ExecuteSqlRawAsync(
                "UPDATE V7.ApiKey SET UsageCount = UsageCount + 1, LastUsedAt = SYSDATETIMEOFFSET() WHERE ApiKeyID = {0}",
                apiKeyId);

            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating API key usage: {ApiKeyId}", apiKeyId);
            return false;
        }
    }

    public async Task<List<ApiKeyInfo>> GetUserApiKeysAsync(int userId)
    {
        try
        {
            var apiKeys = await _context.ApiKeys
                .AsNoTracking()
                .Where(ak => ak.UserID == userId && ak.ArchivedDate == null)
                .OrderByDescending(ak => ak.CreatedDate)
                .Select(ak => new ApiKeyInfo
                {
                    ApiKeyID = ak.ApiKeyID,
                    KeyName = ak.KeyName,
                    KeyPrefix = ak.KeyPrefix,
                    Scopes = ak.Scopes,
                    IsActive = ak.IsActive,
                    ExpiresAt = ak.ExpiresAt.HasValue ? ak.ExpiresAt.Value.DateTime : null,
                    LastUsedAt = ak.LastUsedAt.HasValue ? ak.LastUsedAt.Value.DateTime : null,
                    UsageCount = ak.UsageCount,
                    CreatedDate = ak.CreatedDate.DateTime
                })
                .ToListAsync();

            return apiKeys;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting API keys for user: {UserId}", userId);
            return new List<ApiKeyInfo>();
        }
    }

    public async Task<bool> IsApiKeyActiveAsync(string keyPrefix)
    {
        try
        {
            return await _context.ApiKeys
                .AsNoTracking()
                .Where(ak => ak.KeyPrefix == keyPrefix 
                            && ak.IsActive 
                            && ak.ArchivedDate == null
                            && (ak.ExpiresAt == null || ak.ExpiresAt > DateTimeOffset.UtcNow))
                .AnyAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error checking if API key is active: {KeyPrefix}", keyPrefix);
            return false;
        }
    }

    private async Task<List<string>> GetUserRolesAsync(int userId, int? userAreaId)
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
                return new List<string> { "ApiUser" }; // Default API role

            var roleDescriptions = await _context.Roles
                .AsNoTracking()
                .Where(r => roleIds.Contains(r.RoleID) && r.ArchivedDate == null)
                .Select(r => r.Description ?? $"Role_{r.RoleID}")
                .ToListAsync();

            // Always include ApiUser role for API key authentication
            if (!roleDescriptions.Contains("ApiUser"))
                roleDescriptions.Add("ApiUser");

            return roleDescriptions;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting user roles for API key user: {UserId}", userId);
            return new List<string> { "ApiUser" };
        }
    }

    private static string ComputeApiKeyHash(string apiKey)
    {
        using var sha256 = System.Security.Cryptography.SHA256.Create();
        var hashBytes = sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(apiKey));
        var hash = Convert.ToBase64String(hashBytes);
        
        // Temporary debug to help generate correct hashes for static data
        if (apiKey == "sys_test123456789" || apiKey == "mob_test123456789" || apiKey == "ro_test123456789")
        {
            System.Console.WriteLine($"[HASH_GEN] API Key: '{apiKey}' → Hash: '{hash}'");
        }
        
        return hash;
    }
}