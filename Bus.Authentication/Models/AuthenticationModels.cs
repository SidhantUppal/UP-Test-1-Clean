using System.Security.Claims;

namespace Bus.Authentication.Models;

public enum AuthenticationType
{
    UsernamePassword = 1,
    MicrosoftEntra = 2,
    ApiKey = 3
}

public class AuthenticationRequest
{
    public AuthenticationType Type { get; set; }
    public string? Username { get; set; }
    public string? Password { get; set; }
    public string? EntraToken { get; set; }
    public string? ApiKey { get; set; }
}

public class AuthenticationResponse
{
    public bool Success { get; set; }
    public string? Token { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime ExpiresAt { get; set; }
    public UserInfo? User { get; set; }
    public string? Message { get; set; }
}

public class UserInfo
{
    public int UserId { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public List<string> Roles { get; set; } = new();
    public int? UserAreaId { get; set; }
    public bool IsLocked { get; set; }
    public string? PasswordHash { get; set; }
    public string? PasswordSalt { get; set; }
    public int FailedLoginAttempts { get; set; }
    public bool EmailVerified { get; set; }
    public bool TwoFactorEnabled { get; set; }
    public DateTimeOffset? LastLoginAt { get; set; }
    public string? AzureADObjectId { get; set; }
    public string? AzureObjectId { get; set; }
}

public class JwtSettings
{
    public string SecretKey { get; set; } = string.Empty;
    public string Issuer { get; set; } = string.Empty;
    public string Audience { get; set; } = string.Empty;
    public int ExpirationMinutes { get; set; } = 60;
    public int RefreshTokenExpirationDays { get; set; } = 7;
}

public class TokenValidationResult
{
    public bool IsValid { get; set; }
    public ClaimsPrincipal? Principal { get; set; }
    public string? ErrorMessage { get; set; }
}

public class TokenInfo
{
    public string Token { get; set; } = string.Empty;
    public DateTime ExpiresAt { get; set; }
    public string TokenType { get; set; } = "Bearer";
}
