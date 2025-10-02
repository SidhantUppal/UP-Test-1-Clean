using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("PolicyAcknowledgment", Schema = "V7")]
[Index("PolicyID", Name = "IX_PolicyAcknowledgment_PolicyID")]
[Index("UserID", Name = "IX_PolicyAcknowledgment_UserID")]
[Index("PolicyID", "UserID", Name = "UQ_PolicyAcknowledgment", IsUnique = true)]
public partial class PolicyAcknowledgment
{
    [Key]
    public int PolicyAcknowledgmentID { get; set; }

    public int UserAreaID { get; set; }

    public int PolicyID { get; set; }

    public int UserID { get; set; }

    public DateTimeOffset AcknowledgmentDate { get; set; }

    [StringLength(50)]
    public string? AcknowledgmentMethod { get; set; }

    public string? DigitalSignature { get; set; }

    [StringLength(50)]
    public string? IPAddress { get; set; }

    [StringLength(500)]
    public string? UserAgent { get; set; }

    public string? AcknowledgmentText { get; set; }

    public string? UserComments { get; set; }

    [StringLength(100)]
    public string? VerificationCode { get; set; }

    public bool? IsVerified { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("PolicyID")]
    [InverseProperty("PolicyAcknowledgments")]
    public virtual Policy Policy { get; set; } = null!;

    [ForeignKey("UserID")]
    [InverseProperty("PolicyAcknowledgments")]
    public virtual User User { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("PolicyAcknowledgments")]
    public virtual UserArea UserArea { get; set; } = null!;
}
