namespace Bus.Authentication.Services;

public interface IRefreshTokenRepository
{
    Task<bool> StoreRefreshTokenAsync(StoreRefreshTokenRequest request);
    Task<int?> ValidateRefreshTokenAsync(string tokenHash);
    Task<bool> RevokeRefreshTokenAsync(string tokenHash, string? reason = null);
    Task<bool> RevokeAllUserTokensAsync(int userId, string? reason = null);
    Task<int> CleanupExpiredTokensAsync();
}

public class StoreRefreshTokenRequest
{
    public int UserID { get; set; }
    public string TokenHash { get; set; } = string.Empty;
    public string? JwtTokenId { get; set; }
    public DateTime ExpiresAt { get; set; }
    public string? IPAddress { get; set; }
    public string? UserAgent { get; set; }
    public int? CreatedByUserID { get; set; }
}