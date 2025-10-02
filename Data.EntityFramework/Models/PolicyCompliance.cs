using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("PolicyCompliance", Schema = "V7")]
[Index("ComplianceStatus", Name = "IX_PolicyCompliance_ComplianceStatus")]
[Index("UserID", Name = "IX_PolicyCompliance_UserID")]
public partial class PolicyCompliance
{
    [Key]
    public int PolicyComplianceID { get; set; }

    public int UserAreaID { get; set; }

    public int PolicyID { get; set; }

    public int UserID { get; set; }

    [StringLength(50)]
    public string ComplianceStatus { get; set; } = null!;

    public DateTimeOffset ComplianceDate { get; set; }

    public DateTimeOffset? LastReviewDate { get; set; }

    public DateTimeOffset? NextReviewDate { get; set; }

    public string? ComplianceEvidence { get; set; }

    public string? ComplianceNotes { get; set; }

    public string? ExemptionReason { get; set; }

    public int? ExemptionApprovedBy { get; set; }

    public DateTimeOffset? TrainingCompletedDate { get; set; }

    [Column(TypeName = "decimal(5, 2)")]
    public decimal? TrainingScore { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    [ForeignKey("ExemptionApprovedBy")]
    [InverseProperty("PolicyComplianceExemptionApprovedByNavigations")]
    public virtual User? ExemptionApprovedByNavigation { get; set; }

    [ForeignKey("PolicyID")]
    [InverseProperty("PolicyCompliances")]
    public virtual Policy Policy { get; set; } = null!;

    [ForeignKey("UserID")]
    [InverseProperty("PolicyComplianceUsers")]
    public virtual User User { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("PolicyCompliances")]
    public virtual UserArea UserArea { get; set; } = null!;
}
