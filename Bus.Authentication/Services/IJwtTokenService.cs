using System.Security.Claims;
using Bus.Authentication.Models;

namespace Bus.Authentication.Services;

public interface IJwtTokenService
{
    string GenerateToken(UserInfo user);
    string GenerateRefreshToken();
    ClaimsPrincipal? ValidateToken(string token);
    Bus.Authentication.Models.TokenValidationResult ValidateTokenDetailed(string token);
    ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
}