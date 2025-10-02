using Bus.Authentication.Models;

namespace Bus.Authentication.Services;

public interface IApiKeyRepository
{
    Task<UserInfo?> ValidateApiKeyAsync(string apiKey);
    Task<ApiKeyInfo> CreateApiKeyAsync(CreateApiKeyRequest request);
    Task<bool> RevokeApiKeyAsync(string keyPrefix, int userId);
    Task<bool> UpdateApiKeyUsageAsync(int apiKeyId);
    Task<List<ApiKeyInfo>> GetUserApiKeysAsync(int userId);
    Task<bool> IsApiKeyActiveAsync(string keyPrefix);
}

public class CreateApiKeyRequest
{
    public int UserID { get; set; }
    public string KeyName { get; set; } = string.Empty;
    public string KeyHash { get; set; } = string.Empty;
    public string KeyPrefix { get; set; } = string.Empty;
    public string? Scopes { get; set; }
    public DateTime? ExpiresAt { get; set; }
    public string? IPRestrictions { get; set; }
    public int RateLimitRequests { get; set; } = 1000;
    public int RateLimitWindow { get; set; } = 3600;
    public int CreatedByUserID { get; set; }
}

public class ApiKeyInfo
{
    public int ApiKeyID { get; set; }
    public string KeyName { get; set; } = string.Empty;
    public string KeyPrefix { get; set; } = string.Empty;
    public string? Scopes { get; set; }
    public bool IsActive { get; set; }
    public DateTime? ExpiresAt { get; set; }
    public DateTime? LastUsedAt { get; set; }
    public int UsageCount { get; set; }
    public DateTime CreatedDate { get; set; }
}