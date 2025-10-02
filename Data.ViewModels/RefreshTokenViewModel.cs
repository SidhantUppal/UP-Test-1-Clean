using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RefreshTokenViewModel
{
    [Key]
    public int RefreshTokenID { get; set; }

    public Guid GUID { get; set; }

    public int UserID { get; set; }

    [StringLength(512)]
    public string TokenHash { get; set; } = null!;

    [StringLength(100)]
    public string? JwtTokenId { get; set; }

    public bool IsActive { get; set; }

    public DateTimeOffset ExpiresAt { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public DateTimeOffset? UsedAt { get; set; }

    public DateTimeOffset? RevokedAt { get; set; }

    [StringLength(255)]
    public string? RevokedReason { get; set; }

    [StringLength(45)]
    public string? IPAddress { get; set; }

    [StringLength(500)]
    public string? UserAgent { get; set; }

    public int? CreatedByUserID { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
