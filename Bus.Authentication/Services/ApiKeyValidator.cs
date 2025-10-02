using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Logging;
using Bus.Authentication.Models;

namespace Bus.Authentication.Services;

public class ApiKeyValidator
{
    private readonly ILogger<ApiKeyValidator> _logger;

    // In production, this would be a database service
    // Mock API keys for demonstration
    private readonly Dictionary<string, UserInfo> _apiKeys = new()
    {
        {
            "test-api-key-123",
            new UserInfo
            {
                UserId = 100,
                Username = "api-system",
                Email = "api@company.com",
                FullName = "System API User",
                Roles = new List<string> { "ApiUser", "System" },
                UserAreaId = 1
            }
        },
        {
            "admin-api-key-456",
            new UserInfo
            {
                UserId = 101,
                Username = "api-admin",
                Email = "admin-api@company.com",
                FullName = "Administrative API User",
                Roles = new List<string> { "ApiUser", "Admin", "System" },
                UserAreaId = 1
            }
        }
    };

    public ApiKeyValidator(ILogger<ApiKeyValidator> logger)
    {
        _logger = logger;
    }

    public async Task<UserInfo?> ValidateApiKeyAsync(string apiKey)
    {
        try
        {
            if (string.IsNullOrEmpty(apiKey))
            {
                _logger.LogWarning("API key is null or empty");
                return null;
            }

            // Trim any whitespace
            apiKey = apiKey.Trim();

            // Basic format validation (you might have specific format requirements)
            if (apiKey.Length < 10)
            {
                _logger.LogWarning("API key too short: {Length} characters", apiKey.Length);
                return null;
            }

            // Check against stored API keys
            // In production, you would:
            // 1. Hash the API key and compare against stored hashed values
            // 2. Check expiration date
            // 3. Check if the key is active
            // 4. Log usage for audit purposes
            // 5. Implement rate limiting per key

            if (_apiKeys.TryGetValue(apiKey, out var userInfo))
            {
                _logger.LogInformation("Valid API key used for user {Username} (ID: {UserId})", 
                    userInfo.Username, userInfo.UserId);
                
                // In production, update last used timestamp
                return await Task.FromResult(userInfo);
            }

            // Try to validate against a pattern or database lookup
            var validatedUser = await ValidateApiKeyAgainstDatabase(apiKey);
            if (validatedUser != null)
            {
                _logger.LogInformation("API key validated against database for user {Username}", 
                    validatedUser.Username);
                return validatedUser;
            }

            _logger.LogWarning("Invalid API key provided");
            return null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error validating API key");
            return null;
        }
    }

    private async Task<UserInfo?> ValidateApiKeyAgainstDatabase(string apiKey)
    {
        // TODO: Implement database lookup
        // This would typically:
        // 1. Hash the API key using the same algorithm used when creating it
        // 2. Look up the hashed key in your database
        // 3. Check if the key is active and not expired
        // 4. Return the associated user information

        // For demonstration, validate keys that follow a specific pattern
        if (apiKey.StartsWith("demo-") && apiKey.Length >= 20)
        {
            return new UserInfo
            {
                UserId = Math.Abs(apiKey.GetHashCode()),
                Username = $"demo-user-{apiKey.Substring(5, 8)}",
                Email = "demo@company.com",
                FullName = "Demo API User",
                Roles = new List<string> { "ApiUser" },
                UserAreaId = 1
            };
        }

        return await Task.FromResult<UserInfo?>(null);
    }

    public async Task<bool> RevokeApiKeyAsync(string apiKey)
    {
        try
        {
            // In production, this would mark the API key as inactive in the database
            _logger.LogInformation("API key revocation requested");
            
            // For demo purposes, we can't actually remove from the dictionary
            // but in production you would update the database
            return await Task.FromResult(true);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error revoking API key");
            return false;
        }
    }

    public string GenerateApiKey(int userId, string keyName = "Generated Key")
    {
        // Generate a cryptographically secure API key
        using (var rng = RandomNumberGenerator.Create())
        {
            var bytes = new byte[32];
            rng.GetBytes(bytes);
            
            var key = $"t100_{Convert.ToBase64String(bytes).Replace("/", "_").Replace("+", "-")}";
            
            _logger.LogInformation("Generated new API key for user {UserId} with name '{KeyName}'", 
                userId, keyName);
            
            return key;
        }
    }

    public string HashApiKey(string apiKey)
    {
        // In production, use a proper password hashing algorithm like bcrypt
        using (var sha256 = SHA256.Create())
        {
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(apiKey));
            return Convert.ToBase64String(hashedBytes);
        }
    }
}