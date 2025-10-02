using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class PolicyComplianceViewModel
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

    public decimal? TrainingScore { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
}
