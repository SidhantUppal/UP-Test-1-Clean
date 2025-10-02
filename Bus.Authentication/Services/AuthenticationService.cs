using Bus.Authentication.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Bus.Authentication.Services;

public class AuthenticationService : IAuthenticationService
{
    private readonly IJwtTokenService _jwtTokenService;
    private readonly IConfiguration _configuration;
    private readonly ILogger<AuthenticationService> _logger;
    private readonly EntraTokenValidator _entraTokenValidator;
    private readonly ApiKeyValidator _apiKeyValidator;
    private readonly IUserRepository _userRepository;
    private readonly IApiKeyRepository _apiKeyRepository;
    private readonly IRefreshTokenRepository _refreshTokenRepository;
    private readonly IPasswordHashingService _passwordHashingService;

    public AuthenticationService(
        IJwtTokenService jwtTokenService,
        IConfiguration configuration,
        ILogger<AuthenticationService> logger,
        EntraTokenValidator entraTokenValidator,
        ApiKeyValidator apiKeyValidator,
        IUserRepository userRepository,
        IApiKeyRepository apiKeyRepository,
        IRefreshTokenRepository refreshTokenRepository,
        IPasswordHashingService passwordHashingService)
    {
        _jwtTokenService = jwtTokenService;
        _configuration = configuration;
        _logger = logger;
        _entraTokenValidator = entraTokenValidator;
        _apiKeyValidator = apiKeyValidator;
        _userRepository = userRepository;
        _apiKeyRepository = apiKeyRepository;
        _refreshTokenRepository = refreshTokenRepository;
        _passwordHashingService = passwordHashingService;
    }

    public async Task<AuthenticationResponse> AuthenticateAsync(AuthenticationRequest request)
    {
        UserInfo? user = null;

        try
        {
            user = request.Type switch
            {
                AuthenticationType.UsernamePassword => await ValidateUsernamePasswordAsync(request.Username!, request.Password!),
                AuthenticationType.MicrosoftEntra => await ValidateEntraTokenAsync(request.EntraToken!),
                AuthenticationType.ApiKey => await ValidateApiKeyAsync(request.ApiKey!),
                _ => null
            };

            if (user == null)
            {
                return new AuthenticationResponse
                {
                    Success = false,
                    Message = "Invalid credentials"
                };
            }

            var token = _jwtTokenService.GenerateToken(user);
            var refreshToken = _jwtTokenService.GenerateRefreshToken();
            var refreshTokenHash = ComputeTokenHash(refreshToken);

            // Store refresh token in database
            await _refreshTokenRepository.StoreRefreshTokenAsync(new StoreRefreshTokenRequest
            {
                UserID = user.UserId,
                TokenHash = refreshTokenHash,
                ExpiresAt = DateTime.UtcNow.AddDays(int.Parse(_configuration["Jwt:RefreshTokenExpirationDays"] ?? "7")),
                IPAddress = null, // Can be populated from HTTP context
                UserAgent = null, // Can be populated from HTTP context
                CreatedByUserID = user.UserId
            });

            // Update user's last login
            await _userRepository.UpdateLastLoginAsync(user.UserId);

            return new AuthenticationResponse
            {
                Success = true,
                Token = token,
                RefreshToken = refreshToken,
                ExpiresAt = DateTime.UtcNow.AddMinutes(int.Parse(_configuration["Jwt:ExpirationMinutes"] ?? "60")),
                User = user
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Authentication failed for type {AuthType}", request.Type);
            return new AuthenticationResponse
            {
                Success = false,
                Message = "Authentication failed"
            };
        }
    }

    public async Task<UserInfo?> ValidateUsernamePasswordAsync(string username, string password)
    {
        if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            return null;

        try
        {
            // Get user by username or email
            var user = await _userRepository.GetUserByUsernameAsync(username) 
                      ?? await _userRepository.GetUserByEmailAsync(username);

            if (user == null)
            {
                _logger.LogWarning("User not found for username/email: {Username}", username);
                return null;
            }

            // Check if user is locked
            if (user.IsLocked)
            {
                _logger.LogWarning("Login attempt for locked user: {Username}", username);
                return null;
            }

            // Get user from database to access password hash/salt
            var dbUser = await _userRepository.GetUserByIdAsync(user.UserId);
            if (dbUser?.PasswordHash == null || dbUser.PasswordSalt == null)
            {
                _logger.LogWarning("User {Username} has no password set", username);
                return null;
            }

            // Verify password
            if (!_passwordHashingService.VerifyPassword(password, dbUser.PasswordHash, dbUser.PasswordSalt))
            {
                _logger.LogWarning("Invalid password for user: {Username}", username);
                await _userRepository.IncrementFailedLoginAttemptsAsync(user.UserId);
                return null;
            }

            // Reset failed login attempts on successful login
            await _userRepository.ResetFailedLoginAttemptsAsync(user.UserId);

            // Load user roles
            user.Roles = await _userRepository.GetUserRolesAsync(user.UserId, user.UserAreaId);

            return user;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error validating username/password for user: {Username}", username);
            return null;
        }
    }

    public async Task<UserInfo?> ValidateApiKeyAsync(string apiKey)
    {
        return await _apiKeyRepository.ValidateApiKeyAsync(apiKey);
    }

    public async Task<UserInfo?> ValidateEntraTokenAsync(string entraToken)
    {
        var entraUser = await _entraTokenValidator.ValidateEntraTokenAsync(entraToken);
        if (entraUser == null) return null;

        try
        {
            // Try to find existing user by Entra Object ID
            var existingUser = await _userRepository.GetUserByEntraObjectIdAsync(entraUser.Username); // Using Username as ObjectId
            
            if (existingUser != null)
            {
                // Update existing user's login info
                await _userRepository.UpdateLastLoginAsync(existingUser.UserId);
                existingUser.Roles = await _userRepository.GetUserRolesAsync(existingUser.UserId, existingUser.UserAreaId);
                return existingUser;
            }

            // Try to find by email and link accounts
            existingUser = await _userRepository.GetUserByEmailAsync(entraUser.Email);
            if (existingUser != null)
            {
                // Link existing account to Entra
                await _userRepository.UpdateUserAsync(existingUser.UserId, new UpdateUserRequest
                {
                    EmailVerified = true,
                    ModifiedByUserID = existingUser.UserId
                });
                
                await _userRepository.UpdateLastLoginAsync(existingUser.UserId);
                existingUser.Roles = await _userRepository.GetUserRolesAsync(existingUser.UserId, existingUser.UserAreaId);
                return existingUser;
            }

            // Create new user from Entra token
            var newUser = await _userRepository.CreateUserAsync(new CreateUserRequest
            {
                FullName = entraUser.FullName,
                Email = entraUser.Email,
                AzureADObjectId = entraUser.Username, // Using Username as ObjectId
                EmailVerified = true,
                CreatedByUserID = 1 // System user
            });

            // Load default roles for new Entra users
            newUser.Roles = await _userRepository.GetUserRolesAsync(newUser.UserId, newUser.UserAreaId);
            return newUser;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing Entra token validation for user: {Email}", entraUser.Email);
            return null;
        }
    }

    public async Task<AuthenticationResponse> RefreshTokenAsync(string token, string refreshToken)
    {
        try
        {
            var principal = _jwtTokenService.GetPrincipalFromExpiredToken(token);
            var userId = principal.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return new AuthenticationResponse
                {
                    Success = false,
                    Message = "Invalid token"
                };
            }

            var refreshTokenHash = ComputeTokenHash(refreshToken);
            var validUserId = await _refreshTokenRepository.ValidateRefreshTokenAsync(refreshTokenHash);

            if (validUserId == null || validUserId.Value != int.Parse(userId))
            {
                return new AuthenticationResponse
                {
                    Success = false,
                    Message = "Invalid refresh token"
                };
            }

            // Get current user info from database for fresh data
            var user = await _userRepository.GetUserByIdAsync(validUserId.Value);
            if (user == null)
            {
                return new AuthenticationResponse
                {
                    Success = false,
                    Message = "User not found"
                };
            }

            // Load current user roles
            user.Roles = await _userRepository.GetUserRolesAsync(user.UserId, user.UserAreaId);

            var newToken = _jwtTokenService.GenerateToken(user);
            var newRefreshToken = _jwtTokenService.GenerateRefreshToken();
            var newRefreshTokenHash = ComputeTokenHash(newRefreshToken);

            // Revoke old refresh token and store new one
            await _refreshTokenRepository.RevokeRefreshTokenAsync(refreshTokenHash, "Token refreshed");
            await _refreshTokenRepository.StoreRefreshTokenAsync(new StoreRefreshTokenRequest
            {
                UserID = user.UserId,
                TokenHash = newRefreshTokenHash,
                ExpiresAt = DateTime.UtcNow.AddDays(int.Parse(_configuration["Jwt:RefreshTokenExpirationDays"] ?? "7")),
                CreatedByUserID = user.UserId
            });

            return new AuthenticationResponse
            {
                Success = true,
                Token = newToken,
                RefreshToken = newRefreshToken,
                ExpiresAt = DateTime.UtcNow.AddMinutes(int.Parse(_configuration["Jwt:ExpirationMinutes"] ?? "60")),
                User = user
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Token refresh failed");
            return new AuthenticationResponse
            {
                Success = false,
                Message = "Token refresh failed"
            };
        }
    }

    public async Task<bool> RevokeTokenAsync(string token)
    {
        try
        {
            var principal = _jwtTokenService.ValidateToken(token);
            if (principal == null) return false;

            var userId = principal.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return false;

            // Revoke all refresh tokens for this user
            await _refreshTokenRepository.RevokeAllUserTokensAsync(int.Parse(userId), "User logout");

            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Token revocation failed");
            return false;
        }
    }

    public async Task<TokenInfo> GenerateJwtTokenAsync(UserInfo user)
    {
        try
        {
            // Load user roles if not already loaded
            if (!user.Roles.Any())
            {
                user.Roles = await _userRepository.GetUserRolesAsync(user.UserId, user.UserAreaId);
            }

            var token = _jwtTokenService.GenerateToken(user);
            
            return new TokenInfo
            {
                Token = token,
                ExpiresAt = DateTime.UtcNow.AddMinutes(int.Parse(_configuration["Jwt:ExpirationMinutes"] ?? "60")),
                TokenType = "Bearer"
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating JWT token for user: {UserId}", user.UserId);
            throw;
        }
    }

    public async Task<string> GenerateRefreshTokenAsync(int userId)
    {
        try
        {
            var refreshToken = _jwtTokenService.GenerateRefreshToken();
            var refreshTokenHash = ComputeTokenHash(refreshToken);

            // Store refresh token in database
            await _refreshTokenRepository.StoreRefreshTokenAsync(new StoreRefreshTokenRequest
            {
                UserID = userId,
                TokenHash = refreshTokenHash,
                ExpiresAt = DateTime.UtcNow.AddDays(int.Parse(_configuration["Jwt:RefreshTokenExpirationDays"] ?? "7")),
                CreatedByUserID = userId
            });

            _logger.LogInformation("Generated refresh token for user: {UserId}", userId);
            return refreshToken;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating refresh token for user: {UserId}", userId);
            throw;
        }
    }

    private static string ComputeTokenHash(string token)
    {
        using var sha256 = System.Security.Cryptography.SHA256.Create();
        var hashBytes = sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(token));
        return Convert.ToBase64String(hashBytes);
    }
}