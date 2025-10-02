using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class SafeWorkingProcedureViewModel
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

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
