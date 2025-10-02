using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("EmailServiceConfiguration", Schema = "V7")]
public partial class EmailServiceConfiguration
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

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("EmailServiceConfigurationArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("EmailServiceConfigurationCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("EmailServiceConfigurationModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("EmailServiceConfiguration")]
    public virtual UserArea UserArea { get; set; } = null!;
}
