using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("WorkInstruction", Schema = "V7")]
public partial class WorkInstruction
{
    [Key]
    public int WorkInstructionID { get; set; }

    public int UserAreaID { get; set; }

    public int SSOWDocumentTypeID { get; set; }

    public int SSOWStatusTypeID { get; set; }

    [StringLength(50)]
    public string InstructionNumber { get; set; } = null!;

    [StringLength(255)]
    public string InstructionTitle { get; set; } = null!;

    [StringLength(20)]
    public string? InstructionVersion { get; set; }

    public int? PreviousVersionID { get; set; }

    public bool? IsCurrentVersion { get; set; }

    public string TaskDescription { get; set; } = null!;

    public string DetailedInstructions { get; set; } = null!;

    public string? Prerequisites { get; set; }

    public string? RequiredEquipment { get; set; }

    public string? RequiredMaterials { get; set; }

    public string? RequiredTools { get; set; }

    public string? SafetyRequirements { get; set; }

    public string? HazardWarnings { get; set; }

    [StringLength(500)]
    public string? RequiredPPE { get; set; }

    public string? QualityStandards { get; set; }

    public string? InspectionRequirements { get; set; }

    public string? AcceptanceCriteria { get; set; }

    public int? EstimatedDuration { get; set; }

    public int? PersonnelRequired { get; set; }

    [StringLength(100)]
    public string? SkillLevelRequired { get; set; }

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

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ApproverUserID")]
    [InverseProperty("WorkInstructionApproverUsers")]
    public virtual User? ApproverUser { get; set; }

    [ForeignKey("AuthorUserID")]
    [InverseProperty("WorkInstructionAuthorUsers")]
    public virtual User AuthorUser { get; set; } = null!;

    [InverseProperty("PreviousVersion")]
    public virtual ICollection<WorkInstruction> InversePreviousVersion { get; set; } = new List<WorkInstruction>();

    [ForeignKey("PreviousVersionID")]
    [InverseProperty("InversePreviousVersion")]
    public virtual WorkInstruction? PreviousVersion { get; set; }

    [ForeignKey("PublishedByUserID")]
    [InverseProperty("WorkInstructionPublishedByUsers")]
    public virtual User? PublishedByUser { get; set; }

    [ForeignKey("ReviewerUserID")]
    [InverseProperty("WorkInstructionReviewerUsers")]
    public virtual User? ReviewerUser { get; set; }

    [ForeignKey("SSOWDocumentTypeID")]
    [InverseProperty("WorkInstructions")]
    public virtual SSOWDocumentType SSOWDocumentType { get; set; } = null!;

    [ForeignKey("SSOWStatusTypeID")]
    [InverseProperty("WorkInstructions")]
    public virtual SSOWStatusType SSOWStatusType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("WorkInstructions")]
    public virtual UserArea UserArea { get; set; } = null!;
}
