using Bus.Authentication.Services;
using Data.EntityFramework;
using Data.EntityFramework.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Bus.Authentication.Repositories;

public class SqlRefreshTokenRepository : IRefreshTokenRepository
{
    private readonly V7DBContext _context;
    private readonly ILogger<SqlRefreshTokenRepository> _logger;

    public SqlRefreshTokenRepository(V7DBContext context, ILogger<SqlRefreshTokenRepository> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<bool> StoreRefreshTokenAsync(StoreRefreshTokenRequest request)
    {
        try
        {
            var refreshToken = new RefreshToken
            {
                GUID = Guid.NewGuid(),
                UserID = request.UserID,
                TokenHash = request.TokenHash,
                JwtTokenId = request.JwtTokenId,
                ExpiresAt = request.ExpiresAt,
                CreatedAt = DateTimeOffset.UtcNow,
                IPAddress = request.IPAddress,
                UserAgent = request.UserAgent,
                CreatedByUserID = request.CreatedByUserID,
                IsActive = true
            };

            _context.RefreshTokens.Add(refreshToken);
            await _context.SaveChangesAsync();

            _logger.LogDebug("Stored refresh token for user: {UserId}", request.UserID);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error storing refresh token for user: {UserId}", request.UserID);
            return false;
        }
    }

    public async Task<int?> ValidateRefreshTokenAsync(string tokenHash)
    {
        try
        {
            var refreshToken = await _context.RefreshTokens
                .AsNoTracking()
                .Where(rt => rt.TokenHash == tokenHash 
                            && rt.IsActive 
                            && rt.ExpiresAt > DateTimeOffset.UtcNow
                            && rt.RevokedAt == null)
                .FirstOrDefaultAsync();

            if (refreshToken == null)
            {
                _logger.LogWarning("Invalid or expired refresh token used");
                return null;
            }

            // Update the token as used (fire and forget)
            _ = Task.Run(async () =>
            {
                try
                {
                    await MarkTokenAsUsedAsync(refreshToken.RefreshTokenID);
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Failed to mark refresh token as used: {TokenId}", refreshToken.RefreshTokenID);
                }
            });

            _logger.LogDebug("Validated refresh token for user: {UserId}", refreshToken.UserID);
            return refreshToken.UserID;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error validating refresh token");
            return null;
        }
    }

    public async Task<bool> RevokeRefreshTokenAsync(string tokenHash, string? reason = null)
    {
        try
        {
            var refreshToken = await _context.RefreshTokens
                .Where(rt => rt.TokenHash == tokenHash && rt.IsActive)
                .FirstOrDefaultAsync();

            if (refreshToken == null)
                return false;

            refreshToken.IsActive = false;
            refreshToken.RevokedAt = DateTimeOffset.UtcNow;
            refreshToken.RevokedReason = reason ?? "Token revoked";

            await _context.SaveChangesAsync();

            _logger.LogInformation("Revoked refresh token for user: {UserId}, Reason: {Reason}", 
                refreshToken.UserID, reason ?? "Not specified");
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error revoking refresh token");
            return false;
        }
    }

    public async Task<bool> RevokeAllUserTokensAsync(int userId, string? reason = null)
    {
        try
        {
            var activeTokens = await _context.RefreshTokens
                .Where(rt => rt.UserID == userId && rt.IsActive)
                .ToListAsync();

            if (!activeTokens.Any())
                return true;

            foreach (var token in activeTokens)
            {
                token.IsActive = false;
                token.RevokedAt = DateTimeOffset.UtcNow;
                token.RevokedReason = reason ?? "All tokens revoked";
            }

            await _context.SaveChangesAsync();

            _logger.LogInformation("Revoked {Count} refresh tokens for user: {UserId}, Reason: {Reason}", 
                activeTokens.Count, userId, reason ?? "Not specified");
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error revoking all tokens for user: {UserId}", userId);
            return false;
        }
    }

    public async Task<int> CleanupExpiredTokensAsync()
    {
        try
        {
            // Find tokens that are expired or have been revoked more than 30 days ago
            var cutoffDate = DateTimeOffset.UtcNow.AddDays(-30);
            
            var expiredTokens = await _context.RefreshTokens
                .Where(rt => rt.ExpiresAt < DateTimeOffset.UtcNow || 
                            (rt.RevokedAt != null && rt.RevokedAt < cutoffDate))
                .ToListAsync();

            if (!expiredTokens.Any())
                return 0;

            _context.RefreshTokens.RemoveRange(expiredTokens);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Cleaned up {Count} expired refresh tokens", expiredTokens.Count);
            return expiredTokens.Count;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during refresh token cleanup");
            return 0;
        }
    }

    private async Task MarkTokenAsUsedAsync(int refreshTokenId)
    {
        try
        {
            // Use raw SQL to avoid loading the entity (more efficient)
            await _context.Database.ExecuteSqlRawAsync(
                "UPDATE V7.RefreshToken SET UsedAt = SYSDATETIMEOFFSET() WHERE RefreshTokenID = {0}",
                refreshTokenId);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to mark refresh token as used: {TokenId}", refreshTokenId);
        }
    }

    /// <summary>
    /// Gets token statistics for monitoring and debugging
    /// </summary>
    public async Task<RefreshTokenStats> GetTokenStatsAsync()
    {
        try
        {
            var stats = await _context.RefreshTokens
                .AsNoTracking()
                .GroupBy(rt => 1)
                .Select(g => new RefreshTokenStats
                {
                    TotalTokens = g.Count(),
                    ActiveTokens = g.Count(rt => rt.IsActive && rt.ExpiresAt > DateTimeOffset.UtcNow),
                    ExpiredTokens = g.Count(rt => rt.ExpiresAt <= DateTimeOffset.UtcNow),
                    RevokedTokens = g.Count(rt => rt.RevokedAt != null)
                })
                .FirstOrDefaultAsync();

            return stats ?? new RefreshTokenStats();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting token statistics");
            return new RefreshTokenStats();
        }
    }
}

public class RefreshTokenStats
{
    public int TotalTokens { get; set; }
    public int ActiveTokens { get; set; }
    public int ExpiredTokens { get; set; }
    public int RevokedTokens { get; set; }
}