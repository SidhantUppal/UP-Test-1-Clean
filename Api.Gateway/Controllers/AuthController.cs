using Bus.Authentication.Models;
using Bus.Authentication.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Graph;

namespace Api.Gateway.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthenticationService _authenticationService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(IAuthenticationService authenticationService, ILogger<AuthController> logger)
    {
        _authenticationService = authenticationService;
        _logger = logger;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        try
        {
            var authRequest = new AuthenticationRequest
            {
                Type = AuthenticationType.UsernamePassword,
                Username = request.Username,
                Password = request.Password
            };

            var response = await _authenticationService.AuthenticateAsync(authRequest);
            
            if (!response.Success)
            {
                return Unauthorized(new { message = response.Message ?? "Invalid credentials" });
            }

            return Ok(new
            {
                success = true,
                token = response.Token,
                refreshToken = response.RefreshToken,
                expiresAt = response.ExpiresAt,
                user = response.User
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Login failed for user {Username}", request.Username);
            return StatusCode(500, new { message = "Internal server error" });
        }
    }

    [HttpPost("login/entra")]
    [AllowAnonymous]
    public async Task<IActionResult> LoginWithEntra([FromBody] EntraLoginRequest request)
    {
        try
        {
            var authRequest = new AuthenticationRequest
            {
                Type = AuthenticationType.MicrosoftEntra,
                EntraToken = request.EntraToken
            };

            var response = await _authenticationService.AuthenticateAsync(authRequest);
            
            if (!response.Success)
            {
                return Unauthorized(new { message = response.Message ?? "Invalid Entra token" });
            }

            return Ok(new
            {
                success = true,
                token = response.Token,
                refreshToken = response.RefreshToken,
                expiresAt = response.ExpiresAt,
                user = response.User
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Entra login failed");
            return StatusCode(500, new { message = "Internal server error" });
        }
    }

    [HttpPost("login/apikey")]
    [AllowAnonymous]
    public async Task<IActionResult> LoginWithApiKey([FromBody] ApiKeyLoginRequest request)
    {
        try
        {
            var authRequest = new AuthenticationRequest
            {
                Type = AuthenticationType.ApiKey,
                ApiKey = request.ApiKey
            };

            var response = await _authenticationService.AuthenticateAsync(authRequest);
            
            if (!response.Success)
            {
                return Unauthorized(new { message = response.Message ?? "Invalid API key" });
            }

            return Ok(new
            {
                success = true,
                token = response.Token,
                refreshToken = response.RefreshToken,
                expiresAt = response.ExpiresAt,
                user = response.User
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "API key login failed");
            return StatusCode(500, new { message = "Internal server error" });
        }
    }

    [HttpPost("refresh")]
    [AllowAnonymous]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        try
        {
            var response = await _authenticationService.RefreshTokenAsync(request.Token, request.RefreshToken);
            
            if (!response.Success)
            {
                return Unauthorized(new { message = response.Message ?? "Invalid refresh token" });
            }

            return Ok(new
            {
                success = true,
                token = response.Token,
                refreshToken = response.RefreshToken,
                expiresAt = response.ExpiresAt,
                user = response.User
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Token refresh failed");
            return StatusCode(500, new { message = "Internal server error" });
        }
    }

    [HttpPost("logout")]
    [Authorize]
    public async Task<IActionResult> Logout()
    {
        try
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var success = await _authenticationService.RevokeTokenAsync(token);
            
            return Ok(new { success = success, message = success ? "Logged out successfully" : "Logout failed" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Logout failed");
            return StatusCode(500, new { message = "Internal server error" });
        }
    }

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
            var roles = User.FindAll(System.Security.Claims.ClaimTypes.Role).Select(x => x.Value).ToList();

            var userInfo = new UserInfo
            {
                UserId = int.Parse(userId ?? "0"),
                Username = username ?? "",
                Email = email ?? "",
                FullName = fullName ?? "",
                Roles = roles,
                UserAreaId = int.TryParse(userAreaId, out var areaId) ? areaId : null
            };

            return Ok(userInfo);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to get current user");
            return StatusCode(500, new { message = "Internal server error" });
        }
    }

    [HttpGet("health")]
    [AllowAnonymous]
    public IActionResult Health()
    {
        return Ok("Auth API is healthy");
    }
}

public class LoginRequest
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