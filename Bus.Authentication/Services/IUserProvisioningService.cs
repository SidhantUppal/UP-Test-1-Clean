using Bus.Authentication.Models;

namespace Bus.Authentication.Services;

public interface IUserProvisioningService
{
    /// <summary>
    /// Get or create a user from Azure AD user information
    /// </summary>
    Task<UserInfo?> GetOrCreateUserFromEntraAsync(EntraUserInfo entraUserInfo);
    
    /// <summary>
    /// Update user information from Azure AD
    /// </summary>
    Task<bool> UpdateUserFromEntraAsync(int userId, EntraUserInfo entraUserInfo);
    
    /// <summary>
    /// Link an existing user account with Azure AD
    /// </summary>
    Task<bool> LinkUserWithEntraAsync(int userId, string azureObjectId);
}