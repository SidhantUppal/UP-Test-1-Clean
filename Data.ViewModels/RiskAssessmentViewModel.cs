using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RiskAssessmentViewModel
{
    [Key]
    public int RiskAssessmentID { get; set; }

    public int UserAreaID { get; set; }

    public int? RiskAssessmentTypeID { get; set; }

    public int? RiskAssessmentFormatTypeID { get; set; }

    public int RiskAssessmentStatusTypeID { get; set; }

    public int? RiskMatrixTypeID { get; set; }

    [StringLength(50)]
    public string AssessmentNumber { get; set; } = null!;

    [StringLength(255)]
    public string AssessmentTitle { get; set; } = null!;

    public string? AssessmentDescription { get; set; }

    [StringLength(500)]
    public string? Activity { get; set; }

    [StringLength(500)]
    public string? Location { get; set; }

    [StringLength(500)]
    public string? Equipment { get; set; }

    public DateTimeOffset AssessmentDate { get; set; }

    public int AssessedByUserID { get; set; }

    public DateTimeOffset? ReviewDate { get; set; }

    public int? ReviewedByUserID { get; set; }

    public DateTimeOffset? NextReviewDate { get; set; }

    public int? OverallRiskScore { get; set; }

    public int? ResidualRiskScore { get; set; }

    [StringLength(50)]
    public string? RiskRating { get; set; }

    public bool? ApprovalRequired { get; set; }

    public DateTimeOffset? ApprovedDate { get; set; }

    public int? ApprovedByUserID { get; set; }

    public string? ApprovalComments { get; set; }

    [StringLength(20)]
    public string? Version { get; set; }

    public int? PreviousVersionID { get; set; }

    public bool? IsCurrentVersion { get; set; }

    public bool? IsActive { get; set; }

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
