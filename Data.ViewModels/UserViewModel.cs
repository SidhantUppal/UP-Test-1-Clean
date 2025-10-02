using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserViewModel
{
    [Key]
    public int UserID { get; set; }

    public Guid GUID { get; set; }

    public int? MasterUserAreaID { get; set; }

    [StringLength(255)]
    public string FullName { get; set; } = null!;

    [StringLength(255)]
    public string? Email { get; set; }

    public bool IsMobileAppUser { get; set; }

    public bool HasReadDisclaimer { get; set; }

    public bool IsLocked { get; set; }

    [StringLength(255)]
    public string? LockedMessage { get; set; }

    public DateTimeOffset? LastLoginDate { get; set; }

    [StringLength(255)]
    public string? AzureADObjectId { get; set; }

    [StringLength(100)]
    public string? Username { get; set; }

    [StringLength(512)]
    public string? PasswordHash { get; set; }

    [StringLength(256)]
    public string? PasswordSalt { get; set; }

    public int FailedLoginAttempts { get; set; }

    public DateTimeOffset? LastPasswordChange { get; set; }

    public bool EmailVerified { get; set; }

    public bool TwoFactorEnabled { get; set; }

    public DateTimeOffset? LastLoginAt { get; set; }

    [StringLength(45)]
    public string? IPAddress { get; set; }

    public int? CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
