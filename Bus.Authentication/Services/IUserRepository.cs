using Bus.Authentication.Models;

namespace Bus.Authentication.Services;

public interface IUserRepository
{
    Task<UserInfo?> GetUserByUsernameAsync(string username);
    Task<UserInfo?> GetUserByEmailAsync(string email);
    Task<UserInfo?> GetUserByEntraObjectIdAsync(string entraObjectId);
    Task<UserInfo?> GetUserByAzureObjectIdAsync(string azureObjectId);
    Task<UserInfo?> GetUserByIdAsync(int userId);
    Task<UserInfo> CreateUserAsync(CreateUserRequest request);
    Task<int> CreateUserAsync(UserInfo userInfo);
    Task<bool> UpdateUserAsync(int userId, UpdateUserRequest request);
    Task<bool> UpdateUserAsync(UserInfo userInfo);
    Task<bool> UpdateLastLoginAsync(int userId, string? ipAddress = null);
    Task<bool> UpdatePasswordAsync(int userId, string passwordHash, string salt);
    Task<bool> IncrementFailedLoginAttemptsAsync(int userId);
    Task<bool> ResetFailedLoginAttemptsAsync(int userId);
    Task<List<string>> GetUserRolesAsync(int userId, int? userAreaId = null);
}

public class CreateUserRequest
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Username { get; set; }
    public string? PasswordHash { get; set; }
    public string? PasswordSalt { get; set; }
    public string? AzureADObjectId { get; set; }
    public int? MasterUserAreaID { get; set; }
    public int CreatedByUserID { get; set; }
    public bool EmailVerified { get; set; } = false;
}

public class UpdateUserRequest
{
    public string? FullName { get; set; }
    public string? Email { get; set; }
    public bool? IsLocked { get; set; }
    public string? LockedMessage { get; set; }
    public bool? EmailVerified { get; set; }
    public bool? TwoFactorEnabled { get; set; }
    public int? ModifiedByUserID { get; set; }
}