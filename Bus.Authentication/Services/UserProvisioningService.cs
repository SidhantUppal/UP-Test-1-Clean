using Bus.Authentication.Models;
using Bus.Authentication.Repositories;
using Microsoft.Extensions.Logging;

namespace Bus.Authentication.Services;

public class UserProvisioningService : IUserProvisioningService
{
    private readonly IUserRepository _userRepository;
    private readonly ILogger<UserProvisioningService> _logger;

    public UserProvisioningService(IUserRepository userRepository, ILogger<UserProvisioningService> logger)
    {
        _userRepository = userRepository;
        _logger = logger;
    }

    public async Task<UserInfo?> GetOrCreateUserFromEntraAsync(EntraUserInfo entraUserInfo)
    {
        try
        {
            _logger.LogInformation("Getting or creating user for Azure AD Object ID: {ObjectId}", entraUserInfo.ObjectId);

            // First, try to find user by Azure AD Object ID
            var existingUser = await _userRepository.GetUserByAzureObjectIdAsync(entraUserInfo.ObjectId);
            
            if (existingUser != null)
            {
                _logger.LogInformation("Found existing user linked to Azure AD: {UserId}", existingUser.UserId);
                
                // Update user information from Azure AD
                await UpdateUserFromEntraAsync(existingUser.UserId, entraUserInfo);
                
                // Return updated user info
                return await _userRepository.GetUserByIdAsync(existingUser.UserId);
            }

            // Try to find user by email
            if (!string.IsNullOrEmpty(entraUserInfo.Email))
            {
                existingUser = await _userRepository.GetUserByEmailAsync(entraUserInfo.Email);
                
                if (existingUser != null)
                {
                    _logger.LogInformation("Found existing user by email, linking with Azure AD: {UserId}", existingUser.UserId);
                    
                    // Link the existing user with Azure AD
                    await LinkUserWithEntraAsync(existingUser.UserId, entraUserInfo.ObjectId);
                    await UpdateUserFromEntraAsync(existingUser.UserId, entraUserInfo);
                    
                    return await _userRepository.GetUserByIdAsync(existingUser.UserId);
                }
            }

            // Create new user
            _logger.LogInformation("Creating new user from Azure AD information: {Email}", entraUserInfo.Email);
            
            var newUserId = await CreateUserFromEntraAsync(entraUserInfo);
            
            if (newUserId > 0)
            {
                var newUser = await _userRepository.GetUserByIdAsync(newUserId);
                _logger.LogInformation("Successfully created new user: {UserId}", newUserId);
                return newUser;
            }

            _logger.LogWarning("Failed to create user from Azure AD information");
            return null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting or creating user from Azure AD");
            return null;
        }
    }

    public async Task<bool> UpdateUserFromEntraAsync(int userId, EntraUserInfo entraUserInfo)
    {
        try
        {
            _logger.LogInformation("Updating user {UserId} with Azure AD information", userId);

            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null)
            {
                _logger.LogWarning("User {UserId} not found for update", userId);
                return false;
            }

            // Update user fields with Azure AD information
            user.Email = entraUserInfo.Email;
            user.FullName = entraUserInfo.DisplayName;
            user.EmailVerified = true; // Azure AD emails are considered verified
            
            // Update Azure AD Object ID if not set
            if (string.IsNullOrEmpty(user.AzureObjectId))
            {
                user.AzureObjectId = entraUserInfo.ObjectId;
            }

            var success = await _userRepository.UpdateUserAsync(user);
            
            if (success)
            {
                _logger.LogInformation("Successfully updated user {UserId} with Azure AD information", userId);
            }
            else
            {
                _logger.LogWarning("Failed to update user {UserId} with Azure AD information", userId);
            }

            return success;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating user {UserId} with Azure AD information", userId);
            return false;
        }
    }

    public async Task<bool> LinkUserWithEntraAsync(int userId, string azureObjectId)
    {
        try
        {
            _logger.LogInformation("Linking user {UserId} with Azure AD Object ID: {ObjectId}", userId, azureObjectId);

            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null)
            {
                _logger.LogWarning("User {UserId} not found for Azure AD linking", userId);
                return false;
            }

            user.AzureObjectId = azureObjectId;
            var success = await _userRepository.UpdateUserAsync(user);
            
            if (success)
            {
                _logger.LogInformation("Successfully linked user {UserId} with Azure AD", userId);
            }
            else
            {
                _logger.LogWarning("Failed to link user {UserId} with Azure AD", userId);
            }

            return success;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error linking user {UserId} with Azure AD", userId);
            return false;
        }
    }

    private async Task<int> CreateUserFromEntraAsync(EntraUserInfo entraUserInfo)
    {
        try
        {
            var newUser = new UserInfo
            {
                Username = ExtractUsernameFromEmail(entraUserInfo.Email),
                Email = entraUserInfo.Email,
                FullName = entraUserInfo.DisplayName,
                EmailVerified = true,
                UserAreaId = 1, // Default user area - could be configurable
                AzureObjectId = entraUserInfo.ObjectId,
                Roles = DetermineUserRoles(entraUserInfo)
            };

            var userId = await _userRepository.CreateUserAsync(newUser);
            
            if (userId > 0)
            {
                _logger.LogInformation("Created new user {UserId} from Azure AD: {Email}", userId, entraUserInfo.Email);
            }

            return userId;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating user from Azure AD information");
            return 0;
        }
    }

    private static string ExtractUsernameFromEmail(string email)
    {
        if (string.IsNullOrEmpty(email))
        {
            return $"user_{Guid.NewGuid():N}";
        }

        var atIndex = email.IndexOf('@');
        return atIndex > 0 ? email.Substring(0, atIndex) : email;
    }

    private static List<string> DetermineUserRoles(EntraUserInfo entraUserInfo)
    {
        // Start with roles from Azure AD
        var roles = new List<string>(entraUserInfo.Roles);

        // If no roles specified, assign default role
        if (!roles.Any())
        {
            roles.Add("User");
        }

        // You can add business logic here to map Azure AD roles to application roles
        // For example:
        // if (entraUserInfo.AdditionalClaims.ContainsKey("department") && 
        //     entraUserInfo.AdditionalClaims["department"].ToString() == "IT")
        // {
        //     roles.Add("Admin");
        // }

        return roles.Distinct().ToList();
    }
}