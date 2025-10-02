using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Logging;
using Bus.Authentication.Models;

namespace Bus.Authentication.Services;

public class EntraTokenValidator
{
    private readonly ILogger<EntraTokenValidator> _logger;

    public EntraTokenValidator(ILogger<EntraTokenValidator> logger)
    {
        _logger = logger;
    }

    public async Task<UserInfo?> ValidateEntraTokenAsync(string entraToken)
    {
        try
        {
            if (string.IsNullOrEmpty(entraToken))
                return null;

            // Remove Bearer prefix if present
            var token = entraToken.StartsWith("Bearer ") 
                ? entraToken.Substring("Bearer ".Length) 
                : entraToken;

            // Validate the JWT token structure and decode
            var handler = new JwtSecurityTokenHandler();
            
            // Basic JWT format validation
            if (!handler.CanReadToken(token))
            {
                _logger.LogWarning("Invalid JWT token format for Entra token");
                return null;
            }

            var jwtToken = handler.ReadJwtToken(token);
            
            // Validate token is from Microsoft (issuer validation)
            var issuer = jwtToken.Issuer;
            var validMicrosoftIssuers = new[]
            {
                "https://login.microsoftonline.com/",
                "https://sts.windows.net/",
                "https://login.microsoft.com/"
            };

            if (!validMicrosoftIssuers.Any(validIssuer => issuer.StartsWith(validIssuer)))
            {
                _logger.LogWarning("Token issuer {Issuer} is not from Microsoft", issuer);
                return null;
            }

            // Extract user information from token claims
            var email = jwtToken.Claims.FirstOrDefault(c => c.Type == "email")?.Value ??
                       jwtToken.Claims.FirstOrDefault(c => c.Type == "upn")?.Value ??
                       jwtToken.Claims.FirstOrDefault(c => c.Type == "unique_name")?.Value;

            var name = jwtToken.Claims.FirstOrDefault(c => c.Type == "name")?.Value ??
                      jwtToken.Claims.FirstOrDefault(c => c.Type == "given_name")?.Value ??
                      "Entra User";

            var objectId = jwtToken.Claims.FirstOrDefault(c => c.Type == "oid")?.Value ??
                          jwtToken.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;

            if (string.IsNullOrEmpty(email) && string.IsNullOrEmpty(objectId))
            {
                _logger.LogWarning("No identifiable user information found in Entra token");
                return null;
            }

            // Check token expiration
            var exp = jwtToken.Claims.FirstOrDefault(c => c.Type == "exp")?.Value;
            if (exp != null && long.TryParse(exp, out var expUnix))
            {
                var expiry = DateTimeOffset.FromUnixTimeSeconds(expUnix);
                if (expiry < DateTimeOffset.UtcNow)
                {
                    _logger.LogWarning("Entra token has expired");
                    return null;
                }
            }

            // TODO: In production, you might want to:
            // 1. Validate the signature using Microsoft's public keys (JWKS endpoint)
            // 2. Check token audience matches your application ID
            // 3. Validate specific scopes/roles required for your application
            // 4. Look up or create user in your database based on email/objectId
            // 5. Map Entra roles to your application roles

            // For now, create a user info object from the token claims
            var userInfo = new UserInfo
            {
                UserId = Math.Abs((email ?? objectId ?? "").GetHashCode()), // Generate consistent ID
                Username = email ?? $"entra-{objectId}",
                Email = email ?? "",
                FullName = name,
                Roles = ExtractEntraRoles(jwtToken),
                UserAreaId = 1 // Default user area - could be mapped from token or config
            };

            _logger.LogInformation("Successfully validated Entra token for user {Email}", email);
            return await Task.FromResult(userInfo);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to validate Entra token");
            return null;
        }
    }

    private List<string> ExtractEntraRoles(JwtSecurityToken jwtToken)
    {
        var roles = new List<string>();

        // Check for roles in various claim types
        var roleClaims = jwtToken.Claims.Where(c => 
            c.Type == "roles" || 
            c.Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role" ||
            c.Type == "wids" // Well-known IDs for directory roles
        );

        foreach (var claim in roleClaims)
        {
            roles.Add(claim.Value);
        }

        // Default role if no specific roles found
        if (roles.Count == 0)
        {
            roles.Add("User");
        }

        // Map common Entra roles to application roles
        if (roles.Any(r => r.Contains("Admin") || r.Contains("62e90394-69f5-4237-9190-012177145e10"))) // Global Administrator
        {
            roles.Add("Admin");
        }

        return roles.Distinct().ToList();
    }
}