using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RefreshToken", Schema = "V7")]
[Index("TokenHash", Name = "IX_RefreshToken_TokenHash")]
[Index("UserID", "IsActive", Name = "IX_RefreshToken_User_Active")]
public partial class RefreshToken
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

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("RefreshTokenCreatedByUsers")]
    public virtual User? CreatedByUser { get; set; }

    [ForeignKey("UserID")]
    [InverseProperty("RefreshTokenUsers")]
    public virtual User User { get; set; } = null!;
}
