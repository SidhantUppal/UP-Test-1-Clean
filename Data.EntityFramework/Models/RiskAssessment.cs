using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskAssessment", Schema = "V7")]
[Index("AssessedByUserID", Name = "IX_RiskAssessment_AssessedBy")]
[Index("AssessmentDate", Name = "IX_RiskAssessment_AssessmentDate")]
[Index("AssessmentNumber", Name = "IX_RiskAssessment_AssessmentNumber")]
[Index("NextReviewDate", Name = "IX_RiskAssessment_NextReviewDate")]
[Index("RiskAssessmentStatusTypeID", Name = "IX_RiskAssessment_Status")]
[Index("UserAreaID", Name = "IX_RiskAssessment_UserAreaID")]
public partial class RiskAssessment
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

    [ForeignKey("ApprovedByUserID")]
    [InverseProperty("RiskAssessmentApprovedByUsers")]
    public virtual User? ApprovedByUser { get; set; }

    [ForeignKey("AssessedByUserID")]
    [InverseProperty("RiskAssessmentAssessedByUsers")]
    public virtual User AssessedByUser { get; set; } = null!;

    [InverseProperty("PreviousVersion")]
    public virtual ICollection<RiskAssessment> InversePreviousVersion { get; set; } = new List<RiskAssessment>();

    [InverseProperty("RiskAssessment")]
    public virtual ICollection<MobileSubmission> MobileSubmissions { get; set; } = new List<MobileSubmission>();

    [ForeignKey("PreviousVersionID")]
    [InverseProperty("InversePreviousVersion")]
    public virtual RiskAssessment? PreviousVersion { get; set; }

    [ForeignKey("ReviewedByUserID")]
    [InverseProperty("RiskAssessmentReviewedByUsers")]
    public virtual User? ReviewedByUser { get; set; }

    [InverseProperty("RiskAssessment")]
    public virtual ICollection<RiskAssessmentAffectedItem> RiskAssessmentAffectedItems { get; set; } = new List<RiskAssessmentAffectedItem>();

    [InverseProperty("RiskAssessment")]
    public virtual ICollection<RiskAssessmentApprovalLog> RiskAssessmentApprovalLogs { get; set; } = new List<RiskAssessmentApprovalLog>();

    [InverseProperty("RiskAssessment")]
    public virtual ICollection<RiskAssessmentAttachment> RiskAssessmentAttachments { get; set; } = new List<RiskAssessmentAttachment>();

    [InverseProperty("RiskAssessment")]
    public virtual ICollection<RiskAssessmentControlMeasure> RiskAssessmentControlMeasures { get; set; } = new List<RiskAssessmentControlMeasure>();

    [InverseProperty("NewRiskAssessment")]
    public virtual ICollection<RiskAssessmentConversion> RiskAssessmentConversionNewRiskAssessments { get; set; } = new List<RiskAssessmentConversion>();

    [InverseProperty("SourceRiskAssessment")]
    public virtual ICollection<RiskAssessmentConversion> RiskAssessmentConversionSourceRiskAssessments { get; set; } = new List<RiskAssessmentConversion>();

    [InverseProperty("RiskAssessment")]
    public virtual ICollection<RiskAssessmentExternalLink> RiskAssessmentExternalLinks { get; set; } = new List<RiskAssessmentExternalLink>();

    [InverseProperty("RiskAssessment")]
    public virtual ICollection<RiskAssessmentFieldTypeResponse> RiskAssessmentFieldTypeResponses { get; set; } = new List<RiskAssessmentFieldTypeResponse>();

    [ForeignKey("RiskAssessmentFormatTypeID")]
    [InverseProperty("RiskAssessments")]
    public virtual RiskAssessmentFormatType? RiskAssessmentFormatType { get; set; }

    [InverseProperty("RiskAssessment")]
    public virtual ICollection<RiskAssessmentHazardCategoryType> RiskAssessmentHazardCategoryTypes { get; set; } = new List<RiskAssessmentHazardCategoryType>();

    [InverseProperty("RiskAssessment")]
    public virtual ICollection<RiskAssessmentHazard> RiskAssessmentHazards { get; set; } = new List<RiskAssessmentHazard>();

    [InverseProperty("RiskAssessment")]
    public virtual ICollection<RiskAssessmentLocation> RiskAssessmentLocations { get; set; } = new List<RiskAssessmentLocation>();

    [InverseProperty("OriginalRiskAssessment")]
    public virtual ICollection<RiskAssessmentMonitorEvent> RiskAssessmentMonitorEventOriginalRiskAssessments { get; set; } = new List<RiskAssessmentMonitorEvent>();

    [InverseProperty("RiskAssessment")]
    public virtual ICollection<RiskAssessmentMonitorEvent> RiskAssessmentMonitorEventRiskAssessments { get; set; } = new List<RiskAssessmentMonitorEvent>();

    [InverseProperty("RiskAssessment")]
    public virtual ICollection<RiskAssessmentMonitorEventScore> RiskAssessmentMonitorEventScores { get; set; } = new List<RiskAssessmentMonitorEventScore>();

    [InverseProperty("RiskAssessment")]
    public virtual ICollection<RiskAssessmentMonitorEventXML> RiskAssessmentMonitorEventXMLs { get; set; } = new List<RiskAssessmentMonitorEventXML>();

    [InverseProperty("RiskAssessment")]
    public virtual ICollection<RiskAssessmentOperation> RiskAssessmentOperations { get; set; } = new List<RiskAssessmentOperation>();

    [InverseProperty("RiskAssessment")]
    public virtual ICollection<RiskAssessmentOrgGroup> RiskAssessmentOrgGroups { get; set; } = new List<RiskAssessmentOrgGroup>();

    [InverseProperty("RiskAssessment")]
    public virtual ICollection<RiskAssessmentPersonsAtRisk> RiskAssessmentPersonsAtRisks { get; set; } = new List<RiskAssessmentPersonsAtRisk>();

    [InverseProperty("RiskAssessment")]
    public virtual ICollection<RiskAssessmentRiskSafetyPhrase> RiskAssessmentRiskSafetyPhrases { get; set; } = new List<RiskAssessmentRiskSafetyPhrase>();

    [ForeignKey("RiskAssessmentStatusTypeID")]
    [InverseProperty("RiskAssessments")]
    public virtual RiskAssessmentStatusType RiskAssessmentStatusType { get; set; } = null!;

    [ForeignKey("RiskAssessmentTypeID")]
    [InverseProperty("RiskAssessments")]
    public virtual RiskAssessmentType? RiskAssessmentType { get; set; }

    [InverseProperty("RiskAssessment")]
    public virtual ICollection<RiskAssessmentXML> RiskAssessmentXMLs { get; set; } = new List<RiskAssessmentXML>();

    [ForeignKey("RiskMatrixTypeID")]
    [InverseProperty("RiskAssessments")]
    public virtual RiskMatrixType? RiskMatrixType { get; set; }

    [InverseProperty("RiskAssessment")]
    public virtual ICollection<SafeWorkingProcedure> SafeWorkingProcedures { get; set; } = new List<SafeWorkingProcedure>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("RiskAssessments")]
    public virtual UserArea UserArea { get; set; } = null!;
}
