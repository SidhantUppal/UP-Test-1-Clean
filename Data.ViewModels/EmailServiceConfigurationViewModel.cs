using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class EmailServiceConfigurationViewModel
{
    [Key]
    public int EmailServiceConfigurationID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(50)]
    public string ProviderType { get; set; } = null!;

    [StringLength(255)]
    public string ConfigurationName { get; set; } = null!;

    public bool IsActive { get; set; }

    public bool IsDefault { get; set; }

    public string ConfigurationData { get; set; } = null!;

    [StringLength(255)]
    public string? FromEmail { get; set; }

    [StringLength(255)]
    public string? FromName { get; set; }

    [StringLength(255)]
    public string? ReplyToEmail { get; set; }

    [StringLength(255)]
    public string? TestEmailAddress { get; set; }

    public DateTimeOffset? LastTestDate { get; set; }

    public string? LastTestResult { get; set; }

    public bool RequiresEncryption { get; set; }

    public int? MaxDailyEmails { get; set; }

    public int CreatedByUserID { get; set; }

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
