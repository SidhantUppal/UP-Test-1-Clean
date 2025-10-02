using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SafeWorkingProcedure", Schema = "V7")]
[Index("DocumentNumber", Name = "IX_SafeWorkingProcedure_DocumentNumber")]
[Index("SSOWStatusTypeID", Name = "IX_SafeWorkingProcedure_Status")]
[Index("UserAreaID", Name = "IX_SafeWorkingProcedure_UserAreaID")]
public partial class SafeWorkingProcedure
{
    [Key]
    public int SafeWorkingProcedureID { get; set; }

    public int UserAreaID { get; set; }

    public int SSOWDocumentTypeID { get; set; }

    public int SSOWStatusTypeID { get; set; }

    [StringLength(50)]
    public string DocumentNumber { get; set; } = null!;

    [StringLength(255)]
    public string DocumentTitle { get; set; } = null!;

    [StringLength(20)]
    public string? DocumentVersion { get; set; }

    public int? PreviousVersionID { get; set; }

    public bool? IsCurrentVersion { get; set; }

    public string Purpose { get; set; } = null!;

    public string Scope { get; set; } = null!;

    public string? Responsibilities { get; set; }

    public int? SSOWRiskCategoryID { get; set; }

    public string? HazardIdentification { get; set; }

    public int? RiskAssessmentID { get; set; }

    public string? RequiredPPE { get; set; }

    public string? SafetyEquipment { get; set; }

    public string? RequiredTraining { get; set; }

    public string? CompetencyRequirements { get; set; }

    [StringLength(500)]
    public string? SupervisionRequirements { get; set; }

    public string? EnvironmentalRequirements { get; set; }

    public string? WasteDisposal { get; set; }

    public string? EmergencyProcedures { get; set; }

    public string? EmergencyContacts { get; set; }

    public string? FirstAidRequirements { get; set; }

    public int AuthorUserID { get; set; }

    public int? ReviewerUserID { get; set; }

    public int? ApproverUserID { get; set; }

    public DateTimeOffset? ReviewDate { get; set; }

    public DateTimeOffset? ApprovalDate { get; set; }

    public DateTimeOffset? NextReviewDate { get; set; }

    public DateTimeOffset? PublishedDate { get; set; }

    public int? PublishedByUserID { get; set; }

    public DateTimeOffset? EffectiveDate { get; set; }

    public DateTimeOffset? ExpiryDate { get; set; }

    public string? LegalRequirements { get; set; }

    public string? StandardsReferences { get; set; }

    public string? RelatedDocuments { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("AuthorUserID")]
    [InverseProperty("SafeWorkingProcedures")]
    public virtual User AuthorUser { get; set; } = null!;

    [InverseProperty("PreviousVersion")]
    public virtual ICollection<SafeWorkingProcedure> InversePreviousVersion { get; set; } = new List<SafeWorkingProcedure>();

    [ForeignKey("PreviousVersionID")]
    [InverseProperty("InversePreviousVersion")]
    public virtual SafeWorkingProcedure? PreviousVersion { get; set; }

    [ForeignKey("RiskAssessmentID")]
    [InverseProperty("SafeWorkingProcedures")]
    public virtual RiskAssessment? RiskAssessment { get; set; }

    [ForeignKey("SSOWDocumentTypeID")]
    [InverseProperty("SafeWorkingProcedures")]
    public virtual SSOWDocumentType SSOWDocumentType { get; set; } = null!;

    [ForeignKey("SSOWRiskCategoryID")]
    [InverseProperty("SafeWorkingProcedures")]
    public virtual SSOWRiskCategory? SSOWRiskCategory { get; set; }

    [ForeignKey("SSOWStatusTypeID")]
    [InverseProperty("SafeWorkingProcedures")]
    public virtual SSOWStatusType SSOWStatusType { get; set; } = null!;

    [InverseProperty("SafeWorkingProcedure")]
    public virtual ICollection<SafeWorkingProcedureStep> SafeWorkingProcedureSteps { get; set; } = new List<SafeWorkingProcedureStep>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("SafeWorkingProcedures")]
    public virtual UserArea UserArea { get; set; } = null!;
}
