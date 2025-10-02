using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ApiKeyViewModel
{
    [Key]
    public int ApiKeyID { get; set; }

    public Guid GUID { get; set; }

    public int UserID { get; set; }

    [StringLength(255)]
    public string KeyName { get; set; } = null!;

    [StringLength(512)]
    public string KeyHash { get; set; } = null!;

    [StringLength(20)]
    public string KeyPrefix { get; set; } = null!;

    [StringLength(1000)]
    public string? Scopes { get; set; }

    public bool IsActive { get; set; }

    public DateTimeOffset? ExpiresAt { get; set; }

    public DateTimeOffset? LastUsedAt { get; set; }

    public int UsageCount { get; set; }

    [StringLength(500)]
    public string? IPRestrictions { get; set; }

    public int RateLimitRequests { get; set; }

    public int RateLimitWindow { get; set; }

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
