using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Client;
using System.Security.Claims;
using Bus.Authentication.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Text.Json;

namespace Bus.Authentication.Services;

public class MicrosoftOAuthService : IOAuthService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<MicrosoftOAuthService> _logger;
    private readonly string _tenantId;
    private readonly string _clientId;
    private readonly string[] _scopes = { "openid", "profile", "email", "User.Read" };

    public MicrosoftOAuthService(IConfiguration configuration, ILogger<MicrosoftOAuthService> logger)
    {
        _configuration = configuration;
        _logger = logger;
        
        _tenantId = _configuration["AzureAd:TenantId"] ?? throw new ArgumentNullException("AzureAd:TenantId");
        _clientId = _configuration["AzureAd:ClientId"] ?? throw new ArgumentNullException("AzureAd:ClientId");
    }

    public async Task<string> GetAuthorizationUrlAsync(string redirectUri, string? state = null)
    {
        try
        {
            _logger.LogInformation("Generating authorization URL for redirect URI: {RedirectUri}", redirectUri);

            var instance = _configuration["AzureAd:Instance"] ?? "https://login.microsoftonline.com/";
            var scopes = string.Join(" ", _scopes);
            var stateParam = state ?? Guid.NewGuid().ToString();
            
            var authUrl = $"{instance}{_tenantId}/oauth2/v2.0/authorize?" +
                         $"client_id={Uri.EscapeDataString(_clientId)}&" +
                         $"response_type=code&" +
                         $"redirect_uri={Uri.EscapeDataString(redirectUri)}&" +
                         $"response_mode=query&" +
                         $"scope={Uri.EscapeDataString(scopes)}&" +
                         $"state={Uri.EscapeDataString(stateParam)}";

            _logger.LogInformation("Generated authorization URL successfully");
            return authUrl;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to generate authorization URL");
            throw;
        }
    }

    public async Task<OAuthTokenResult> ExchangeCodeForTokenAsync(string code, string redirectUri, string? state = null)
    {
        try
        {
            _logger.LogInformation("Exchanging authorization code for tokens");
            _logger.LogInformation("Redirect URI: {RedirectUri}", redirectUri);
            _logger.LogInformation("Client ID: {ClientId}", _clientId);

            var instance = _configuration["AzureAd:Instance"] ?? "https://login.microsoftonline.com/";
            var clientSecret = _configuration["AzureAd:ClientSecret"] ?? throw new ArgumentNullException("AzureAd:ClientSecret");
            var tokenEndpoint = $"{instance}{_tenantId}/oauth2/v2.0/token";
            
            _logger.LogInformation("Token endpoint: {TokenEndpoint}", tokenEndpoint);

            using var httpClient = new HttpClient();
            var tokenRequestData = new Dictionary<string, string>
            {
                {"client_id", _clientId},
                {"client_secret", clientSecret},
                {"code", code},
                {"redirect_uri", redirectUri},
                {"grant_type", "authorization_code"},
                {"scope", string.Join(" ", _scopes)}
            };

            var tokenRequestContent = new FormUrlEncodedContent(tokenRequestData);
            var tokenResponse = await httpClient.PostAsync(tokenEndpoint, tokenRequestContent);
            var tokenResponseContent = await tokenResponse.Content.ReadAsStringAsync();

            if (!tokenResponse.IsSuccessStatusCode)
            {
                _logger.LogError("Token exchange failed: {StatusCode} - {Content}", tokenResponse.StatusCode, tokenResponseContent);
                return new OAuthTokenResult 
                { 
                    Success = false, 
                    Error = $"Token exchange failed: {tokenResponse.StatusCode} - {tokenResponseContent}" 
                };
            }

            var tokenData = JsonSerializer.Deserialize<Dictionary<string, object>>(tokenResponseContent);
            if (tokenData == null)
            {
                return new OAuthTokenResult { Success = false, Error = "Invalid token response" };
            }

            var accessToken = tokenData.TryGetValue("access_token", out var at) ? at.ToString() : null;
            var idToken = tokenData.TryGetValue("id_token", out var it) ? it.ToString() : null;
            var refreshToken = tokenData.TryGetValue("refresh_token", out var rt) ? rt.ToString() : null;
            var expiresIn = 3600; // Default to 1 hour
            
            if (tokenData.TryGetValue("expires_in", out var ei))
            {
                if (ei is JsonElement jsonElement)
                {
                    if (jsonElement.TryGetInt32(out var expiry))
                    {
                        expiresIn = expiry;
                    }
                }
                else if (int.TryParse(ei.ToString(), out var expiry))
                {
                    expiresIn = expiry;
                }
            }

            if (string.IsNullOrEmpty(accessToken) || string.IsNullOrEmpty(idToken))
            {
                return new OAuthTokenResult { Success = false, Error = "Missing access_token or id_token" };
            }

            // Extract user information from the ID token
            var userInfo = ExtractUserInfoFromIdToken(idToken);
            
            var result = new OAuthTokenResult
            {
                Success = true,
                AccessToken = accessToken,
                RefreshToken = refreshToken ?? accessToken,
                IdToken = idToken,
                ExpiresAt = DateTime.UtcNow.AddSeconds(expiresIn),
                UserInfo = userInfo
            };

            _logger.LogInformation("Successfully exchanged code for tokens for user: {Email}", userInfo?.Email);
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error during token exchange");
            return new OAuthTokenResult 
            { 
                Success = false, 
                Error = "An unexpected error occurred during authentication" 
            };
        }
    }

    public async Task<EntraUserInfo?> GetUserInfoFromTokenAsync(string accessToken)
    {
        try
        {
            // For this implementation, we'll extract info from the JWT token
            // In production, you might want to call Microsoft Graph API for more details
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadJwtToken(accessToken);
            
            var userInfo = new EntraUserInfo
            {
                ObjectId = jsonToken.Claims.FirstOrDefault(c => c.Type == "oid")?.Value ?? 
                          jsonToken.Claims.FirstOrDefault(c => c.Type == "sub")?.Value ?? string.Empty,
                Email = jsonToken.Claims.FirstOrDefault(c => c.Type == "email")?.Value ??
                        jsonToken.Claims.FirstOrDefault(c => c.Type == "preferred_username")?.Value ?? string.Empty,
                DisplayName = jsonToken.Claims.FirstOrDefault(c => c.Type == "name")?.Value ?? string.Empty,
                GivenName = jsonToken.Claims.FirstOrDefault(c => c.Type == "given_name")?.Value ?? string.Empty,
                Surname = jsonToken.Claims.FirstOrDefault(c => c.Type == "family_name")?.Value ?? string.Empty,
                TenantId = jsonToken.Claims.FirstOrDefault(c => c.Type == "tid")?.Value ?? string.Empty
            };

            // Extract roles if present
            var roleClaims = jsonToken.Claims.Where(c => c.Type == "roles" || c.Type == ClaimTypes.Role);
            userInfo.Roles = roleClaims.Select(c => c.Value).ToList();

            // Extract additional claims
            userInfo.AdditionalClaims = jsonToken.Claims
                .Where(c => !new[] { "oid", "sub", "email", "preferred_username", "name", "given_name", "family_name", "tid", "roles" }.Contains(c.Type))
                .ToDictionary(c => c.Type, c => (object)c.Value);

            return userInfo;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to extract user info from token");
            return null;
        }
    }

    private EntraUserInfo ExtractUserInfoFromIdToken(string idToken)
    {
        try
        {
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadJwtToken(idToken);
            
            var userInfo = new EntraUserInfo
            {
                ObjectId = jsonToken.Claims.FirstOrDefault(c => c.Type == "oid")?.Value ?? 
                          jsonToken.Claims.FirstOrDefault(c => c.Type == "sub")?.Value ?? string.Empty,
                Email = jsonToken.Claims.FirstOrDefault(c => c.Type == "email")?.Value ??
                        jsonToken.Claims.FirstOrDefault(c => c.Type == "preferred_username")?.Value ?? 
                        jsonToken.Claims.FirstOrDefault(c => c.Type == "upn")?.Value ?? string.Empty,
                DisplayName = jsonToken.Claims.FirstOrDefault(c => c.Type == "name")?.Value ?? string.Empty,
                GivenName = jsonToken.Claims.FirstOrDefault(c => c.Type == "given_name")?.Value ?? string.Empty,
                Surname = jsonToken.Claims.FirstOrDefault(c => c.Type == "family_name")?.Value ?? string.Empty,
                TenantId = jsonToken.Claims.FirstOrDefault(c => c.Type == "tid")?.Value ?? string.Empty
            };

            // Extract roles if present
            var roleClaims = jsonToken.Claims.Where(c => c.Type == "roles" || c.Type == ClaimTypes.Role);
            userInfo.Roles = roleClaims.Select(c => c.Value).ToList();

            // Extract additional claims for debugging/logging
            userInfo.AdditionalClaims = jsonToken.Claims.ToDictionary(c => c.Type, c => (object)c.Value);

            return userInfo;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to extract user info from ID token");
            throw;
        }
    }
}