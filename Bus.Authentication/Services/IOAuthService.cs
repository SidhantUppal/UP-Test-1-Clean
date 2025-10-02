using Bus.Authentication.Models;

namespace Bus.Authentication.Services;

public interface IOAuthService
{
    /// <summary>
    /// Generate the authorization URL for Microsoft Entra ID OAuth flow
    /// </summary>
    Task<string> GetAuthorizationUrlAsync(string redirectUri, string? state = null);
    
    /// <summary>
    /// Exchange authorization code for access token and user information
    /// </summary>
    Task<OAuthTokenResult> ExchangeCodeForTokenAsync(string code, string redirectUri, string? state = null);
    
    /// <summary>
    /// Validate and extract user information from Microsoft Entra ID token
    /// </summary>
    Task<EntraUserInfo?> GetUserInfoFromTokenAsync(string accessToken);
}

public class OAuthTokenResult
{
    public bool Success { get; set; }
    public string? AccessToken { get; set; }
    public string? RefreshToken { get; set; }
    public string? IdToken { get; set; }
    public DateTime ExpiresAt { get; set; }
    public EntraUserInfo? UserInfo { get; set; }
    public string? Error { get; set; }
}

public class EntraUserInfo
{
    public string ObjectId { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string GivenName { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public string TenantId { get; set; } = string.Empty;
    public List<string> Roles { get; set; } = new();
    public Dictionary<string, object> AdditionalClaims { get; set; } = new();
}