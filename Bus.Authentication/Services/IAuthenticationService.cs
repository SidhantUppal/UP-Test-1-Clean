using Bus.Authentication.Models;

namespace Bus.Authentication.Services;

public interface IAuthenticationService
{
    Task<AuthenticationResponse> AuthenticateAsync(AuthenticationRequest request);
    Task<AuthenticationResponse> RefreshTokenAsync(string token, string refreshToken);
    Task<bool> RevokeTokenAsync(string token);
    Task<UserInfo?> ValidateApiKeyAsync(string apiKey);
    Task<UserInfo?> ValidateUsernamePasswordAsync(string username, string password);
    Task<UserInfo?> ValidateEntraTokenAsync(string entraToken);
    Task<TokenInfo> GenerateJwtTokenAsync(UserInfo user);
    Task<string> GenerateRefreshTokenAsync(int userId);
}