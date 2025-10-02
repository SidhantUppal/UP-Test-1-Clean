using Bus.Authentication.Models;
using Bus.Authentication.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;

namespace Api.SysAdmin.Controllers;

/// <summary>
/// Authentication controller for the SysAdmin API
/// Supports username/password, Microsoft Entra ID, and API key authentication
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthenticationService _authService;
    private readonly IOAuthService _oauthService;
    private readonly IUserProvisioningService _userProvisioningService;
    private readonly IConfiguration _configuration;
    private readonly ILogger<AuthController> _logger;
    private readonly IAntiforgery _antiforgery;

    public AuthController(
        IAuthenticationService authService,
        IOAuthService oauthService,
        IUserProvisioningService userProvisioningService,
        IConfiguration configuration,
        ILogger<AuthController> logger,
        IAntiforgery antiforgery)
    {
        _authService = authService;
        _oauthService = oauthService;
        _userProvisioningService = userProvisioningService;
        _configuration = configuration;
        _logger = logger;
        _antiforgery = antiforgery;
    }

    /// <summary>
    /// Universal login endpoint supporting all three authentication methods
    /// </summary>
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] AuthenticationRequest request)
    {
        try
        {
            var result = await _authService.AuthenticateAsync(request);
            
            if (!result.Success)
            {
                return Unauthorized(new { message = result.Message ?? "Authentication failed" });
            }

            // Don't return sensitive information
            var response = new
            {
                success = true,
                token = result.Token,
                refreshToken = result.RefreshToken,
                expiresAt = result.ExpiresAt,
                user = new
                {
                    id = result.User!.UserId,
                    username = result.User.Username,
                    email = result.User.Email,
                    fullName = result.User.FullName,
                    roles = result.User.Roles,
                    userAreaId = result.User.UserAreaId,
                    emailVerified = result.User.EmailVerified
                }
            };

            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during authentication");
            return StatusCode(500, new { message = "Authentication service error" });
        }
    }

    /// <summary>
    /// Username/Password specific login endpoint
    /// </summary>
    [HttpPost("login/password")]
    public async Task<IActionResult> LoginWithPassword([FromBody] PasswordLoginRequest request)
    {
        try
        {
            var authRequest = new AuthenticationRequest
            {
                Type = AuthenticationType.UsernamePassword,
                Username = request.Username,
                Password = request.Password
            };

            var result = await _authService.AuthenticateAsync(authRequest);

            if (!result.Success)
            {
                return Unauthorized(new { success = false, message = result.Message ?? "Authentication failed" });
            }

            // Set HttpOnly cookies instead of returning tokens in response
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = Request.IsHttps, // Use HTTPS in production
                SameSite = SameSiteMode.Strict,
                Expires = result.ExpiresAt,
                Path = "/"
            };

            Response.Cookies.Append("auth-token", result.Token!, cookieOptions);

            // Also set refresh token cookie if available
            if (!string.IsNullOrEmpty(result.RefreshToken))
            {
                Response.Cookies.Append("refresh-token", result.RefreshToken, cookieOptions);
            }

            // Return user info but NOT the tokens
            var response = new
            {
                success = true,
                user = new
                {
                    userId = result.User!.UserId,
                    username = result.User.Username,
                    email = result.User.Email,
                    fullName = result.User.FullName,
                    roles = result.User.Roles,
                    userAreaId = result.User.UserAreaId,
                    emailVerified = result.User.EmailVerified
                },
                expiresAt = result.ExpiresAt
            };

            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during password authentication");
            return StatusCode(500, new { success = false, message = "Authentication service error" });
        }
    }

    /// <summary>
    /// Microsoft Entra ID login endpoint
    /// </summary>
    [HttpPost("login/entra")]
    public async Task<IActionResult> LoginWithEntra([FromBody] EntraLoginRequest request)
    {
        var authRequest = new AuthenticationRequest
        {
            Type = AuthenticationType.MicrosoftEntra,
            EntraToken = request.EntraToken
        };

        return await Login(authRequest);
    }

    /// <summary>
    /// API Key authentication endpoint
    /// </summary>
    [HttpPost("login/apikey")]
    public async Task<IActionResult> LoginWithApiKey([FromBody] ApiKeyLoginRequest request)
    {
        var authRequest = new AuthenticationRequest
        {
            Type = AuthenticationType.ApiKey,
            ApiKey = request.ApiKey
        };

        return await Login(authRequest);
    }

    /// <summary>
    /// Refresh access token using refresh token
    /// </summary>
    [HttpPost("refresh")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        try
        {
            var result = await _authService.RefreshTokenAsync(request.Token, request.RefreshToken);
            
            if (!result.Success)
            {
                return Unauthorized(new { message = result.Message ?? "Invalid refresh token" });
            }

            var response = new
            {
                success = true,
                token = result.Token,
                refreshToken = result.RefreshToken,
                expiresAt = result.ExpiresAt,
                user = new
                {
                    id = result.User!.UserId,
                    username = result.User.Username,
                    email = result.User.Email,
                    fullName = result.User.FullName,
                    roles = result.User.Roles,
                    userAreaId = result.User.UserAreaId
                }
            };

            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during token refresh");
            return StatusCode(500, new { message = "Token refresh service error" });
        }
    }

    /// <summary>
    /// Logout and revoke all refresh tokens for the current user
    /// </summary>
    [HttpPost("logout")]
    [Authorize]
    public async Task<IActionResult> Logout()
    {
        try
        {
            // Try to get token from cookie first, then header
            var token = Request.Cookies["auth-token"] ??
                       Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            if (!string.IsNullOrEmpty(token))
            {
                var result = await _authService.RevokeTokenAsync(token);
                if (!result)
                {
                    _logger.LogWarning("Failed to revoke token during logout");
                }
            }

            // Clear cookies regardless of token revocation success
            Response.Cookies.Delete("auth-token");
            Response.Cookies.Delete("refresh-token");

            return Ok(new { success = true, message = "Logged out successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during logout");

            // Still try to clear cookies even if there was an error
            Response.Cookies.Delete("auth-token");
            Response.Cookies.Delete("refresh-token");

            return Ok(new { success = true, message = "Logged out successfully" });
        }
    }

    /// <summary>
    /// Logout and redirect to Microsoft Entra ID logout page
    /// </summary>
    [HttpGet("logout/entra")]
    public async Task<IActionResult> LogoutEntra([FromQuery] string? returnUrl = null)
    {
        try
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            
            // Try to revoke tokens if present, but don't fail if not
            if (!string.IsNullOrEmpty(token))
            {
                try
                {
                    await _authService.RevokeTokenAsync(token);
                }
                catch (Exception ex)
                {
                    // Continue with logout even if token revocation fails
                    _logger.LogWarning(ex, "Failed to revoke token during Entra logout");
                }
            }

            // Build Microsoft logout URL without post_logout_redirect_uri for now
            // This will let Microsoft handle the logout flow and show their default logout page
            var tenantId = _configuration["AzureAd:TenantId"];
            var logoutUrl = $"https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/logout";
            
            // If you want to add post_logout_redirect_uri later, make sure the URI is registered 
            // in Azure AD App Registration -> Authentication -> Redirect URIs -> Web -> Logout URL

            // Instead of returning JSON, redirect directly to Microsoft logout
            return Redirect(logoutUrl);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during Entra logout");
            return StatusCode(500, new { message = "Logout service error" });
        }
    }

    /// <summary>
    /// Get current user information (requires authentication)
    /// </summary>
    [HttpGet("me")]
    [Authorize]
    public IActionResult GetCurrentUser()
    {
        try
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            var username = User.FindFirst(System.Security.Claims.ClaimTypes.Name)?.Value;
            var email = User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value;
            var fullName = User.FindFirst("FullName")?.Value;
            var userAreaId = User.FindFirst("UserAreaId")?.Value;
            var roles = User.FindAll(System.Security.Claims.ClaimTypes.Role).Select(c => c.Value).ToList();

            var userInfo = new
            {
                userId = int.TryParse(userId, out var parsedUserId) ? parsedUserId : 0,
                username = username ?? "",
                email = email ?? "",
                fullName = fullName ?? "",
                userAreaId = int.TryParse(userAreaId, out var areaId) ? (int?)areaId : null,
                roles = roles
            };

            return Ok(userInfo);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting current user");
            return StatusCode(500, new { message = "Error retrieving user information" });
        }
    }

    /// <summary>
    /// Health check endpoint - will be at /api/Auth/health
    /// </summary>
    [HttpGet("health")]
    [AllowAnonymous]
    public IActionResult Health()
    {
        return Ok(new
        {
            status = "healthy",
            service = "Api.SysAdmin",
            timestamp = DateTime.UtcNow.ToString("O"),
            version = "1.0.0"
        });
    }

    /// <summary>
    /// Get CSRF token for state-changing operations
    /// </summary>
    [HttpGet("csrf-token")]
    public IActionResult GetCsrfToken()
    {
        try
        {
            var tokens = _antiforgery.GetAndStoreTokens(HttpContext);
            return Ok(new { token = tokens.RequestToken });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting CSRF token");
            return StatusCode(500, new { message = "Error getting CSRF token" });
        }
    }

    /// <summary>
    /// Initiate Microsoft Entra ID OAuth flow
    /// </summary>
    [HttpGet("login/entra/oauth")]
    public async Task<IActionResult> InitiateEntraOAuth([FromQuery] string? returnUrl = null)
    {
        try
        {
            var redirectUri = _configuration["AzureAd:RedirectUri"] ?? "http://localhost:3000/api/auth/callback";
            var state = GenerateState(returnUrl);
            
            var authUrl = await _oauthService.GetAuthorizationUrlAsync(redirectUri, state);
            
            return Ok(new { authUrl, redirectUri, state });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error initiating Entra OAuth flow");
            return StatusCode(500, new { message = "Failed to initiate OAuth flow", error = ex.Message });
        }
    }

    /// <summary>
    /// Handle Microsoft Entra ID OAuth callback
    /// </summary>
    [HttpGet("callback")]
    public async Task<IActionResult> HandleOAuthCallback([FromQuery] string? code, [FromQuery] string? state, [FromQuery] string? error, [FromQuery] string? error_description)
    {
        try
        {
            // Check for errors
            if (!string.IsNullOrEmpty(error))
            {
                return BadRequest(new { message = error_description ?? error });
            }

            if (string.IsNullOrEmpty(code))
            {
                return BadRequest(new { message = "Authorization code is required" });
            }

            var redirectUri = _configuration["AzureAd:RedirectUri"] ?? "http://localhost:3000/api/auth/callback";
            
            // Exchange code for tokens
            var tokenResult = await _oauthService.ExchangeCodeForTokenAsync(code, redirectUri, state);
            
            if (!tokenResult.Success || tokenResult.UserInfo == null)
            {
                return BadRequest(new { message = tokenResult.Error ?? "Token exchange failed", details = "OAuth token exchange failed" });
            }

            // Get or create user from Azure AD info
            var user = await _userProvisioningService.GetOrCreateUserFromEntraAsync(tokenResult.UserInfo);
            
            if (user == null)
            {
                return BadRequest(new { message = "Failed to create user account", details = "User provisioning failed" });
            }

            // Generate JWT token for the application
            var jwtToken = await _authService.GenerateJwtTokenAsync(user);
            var refreshToken = await _authService.GenerateRefreshTokenAsync(user.UserId);

            // Set HttpOnly cookies instead of sending tokens in URL
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = Request.IsHttps, // Use HTTPS in production
                SameSite = SameSiteMode.Strict,
                Expires = jwtToken.ExpiresAt,
                Path = "/"
            };

            Response.Cookies.Append("auth-token", jwtToken.Token, cookieOptions);
            Response.Cookies.Append("refresh-token", refreshToken, cookieOptions);

            // Redirect to auth-callback to store user info (no tokens in URL now)
            var callbackUrl = "http://localhost:3000/auth-callback";
            var frontendUrl = $"{callbackUrl}?success=true&expiresAt={Uri.EscapeDataString(jwtToken.ExpiresAt.ToString("O"))}&userId={user.UserId}&email={Uri.EscapeDataString(user.Email)}&fullName={Uri.EscapeDataString(user.FullName)}";

            // Parse return URL from state and pass it to auth-callback for final redirect
            var returnUrl = ParseReturnUrlFromState(state);
            if (!string.IsNullOrEmpty(returnUrl))
            {
                frontendUrl += $"&returnUrl={Uri.EscapeDataString(returnUrl)}";
            }

            return Redirect(frontendUrl);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during OAuth callback: {ErrorMessage}", ex.Message);
            return StatusCode(500, new { message = "Authentication service error", details = ex.Message, type = ex.GetType().Name });
        }
    }

    private static string GenerateState(string? returnUrl)
    {
        var state = new
        {
            nonce = Guid.NewGuid().ToString("N"),
            returnUrl = returnUrl,
            timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds()
        };
        
        var json = System.Text.Json.JsonSerializer.Serialize(state);
        return Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(json));
    }

    private static string? ParseReturnUrlFromState(string? state)
    {
        try
        {
            if (string.IsNullOrEmpty(state)) return null;
            
            var json = System.Text.Encoding.UTF8.GetString(Convert.FromBase64String(state));
            var stateObject = System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, object>>(json);
            
            if (stateObject?.TryGetValue("returnUrl", out var returnUrl) == true)
            {
                var returnUrlString = returnUrl?.ToString();
                
                // Clean up return URL - remove any existing tokens to prevent loops
                if (!string.IsNullOrEmpty(returnUrlString))
                {
                    var uri = new Uri(returnUrlString);
                    var cleanUrl = $"{uri.Scheme}://{uri.Host}:{uri.Port}{uri.AbsolutePath}";
                    
                    // Only return clean URLs, avoid error pages or token-containing URLs
                    if (returnUrlString.Contains("error=") || returnUrlString.Contains("token="))
                    {
                        return null; // Force default redirect
                    }
                    
                    return cleanUrl;
                }
            }
            
            return null;
        }
        catch (Exception)
        {
            return null;
        }
    }
}

// Request DTOs
public class PasswordLoginRequest
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class EntraLoginRequest
{
    public string EntraToken { get; set; } = string.Empty;
}

public class ApiKeyLoginRequest
{
    public string ApiKey { get; set; } = string.Empty;
}

public class RefreshTokenRequest
{
    public string Token { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
}