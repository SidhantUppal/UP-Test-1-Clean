using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Checklist", Schema = "V7")]
[Index("UserAreaID", "ArchivedDate", Name = "IX_Checklist_UserArea")]
[Index("UserAreaID", Name = "IX_UserAreaID")]
[Index("OriginalQuestionnaireID", Name = "ix_Checklist_OriginalQuestionnaireID")]
public partial class Checklist
{
    [Key]
    public int ChecklistID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    public int ChecklistTypeID { get; set; }

    public int? ChecklistSectorTypeID { get; set; }

    public int? SectorTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public int? OriginalQuestionnaireID { get; set; }

    public bool RequiresRenewal { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    [StringLength(512)]
    public string? EmailSubject { get; set; }

    public string? EmailText { get; set; }

    [StringLength(512)]
    public string? RenewalEmailSubject { get; set; }

    public string? RenewalEmailText { get; set; }

    public int? RenewalFrequencyTypeID { get; set; }

    public string? Notes { get; set; }

    public bool AllowFurtherActions { get; set; }

    public bool IsEvidenceRequiredToCloseFurtherAction { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? ManagerEmployeeID { get; set; }

    public int? ConformityTypeID { get; set; }

    public int? OrgGroupID { get; set; }

    public bool IsEnvironmental { get; set; }

    public bool IsHidden { get; set; }

    public bool DeleteOverdueAssignmentsOnChecklistDelete { get; set; }

    public bool AllowMajorMinorNonConformity { get; set; }

    public bool HasRelaxedValidation { get; set; }

    public bool HasCompleteAgainEnabled { get; set; }

    public bool DisableEmails { get; set; }

    public bool IsForHomeWorking { get; set; }

    public bool IsActive { get; set; }

    public bool IsSignOff { get; set; }

    public int? SignOffChecklistID { get; set; }

    public bool DisableAutoNumbering { get; set; }

    public bool IsDefaultForContractor { get; set; }

    public bool AllowMultipleOpenAssignmentsPerAssignee { get; set; }

    public bool IsForDSE { get; set; }

    public bool AllowBulkPrintingOfResponses { get; set; }

    public bool CaptureCompletionTimeframe { get; set; }

    public int? DefaultLocationID { get; set; }

    public bool AllowSelfAssignmentOnCompleteNow { get; set; }

    public bool SendRenewalReminderOnCompleteNow { get; set; }

    public bool IsDSE { get; set; }

    public int? ExposureTypeID { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ChecklistArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("Checklist")]
    public virtual ICollection<ChecklistAssetInspection> ChecklistAssetInspections { get; set; } = new List<ChecklistAssetInspection>();

    [InverseProperty("Checklist")]
    public virtual ICollection<ChecklistAssignment> ChecklistAssignments { get; set; } = new List<ChecklistAssignment>();

    [InverseProperty("Checklist")]
    public virtual ICollection<ChecklistOrgGroup> ChecklistOrgGroups { get; set; } = new List<ChecklistOrgGroup>();

    [ForeignKey("ChecklistSectorTypeID")]
    [InverseProperty("Checklists")]
    public virtual ChecklistSectorType? ChecklistSectorType { get; set; }

    [ForeignKey("ChecklistTypeID")]
    [InverseProperty("Checklists")]
    public virtual ChecklistType ChecklistType { get; set; } = null!;

    [InverseProperty("Checklist")]
    public virtual ICollection<ChecklistViewResponseUser> ChecklistViewResponseUsers { get; set; } = new List<ChecklistViewResponseUser>();

    [ForeignKey("ConformityTypeID")]
    [InverseProperty("Checklists")]
    public virtual ConformityType? ConformityType { get; set; }

    [InverseProperty("DefaultChecklist")]
    public virtual ICollection<ContractorCompany> ContractorCompanies { get; set; } = new List<ContractorCompany>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ChecklistCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("DefaultLocationID")]
    [InverseProperty("Checklists")]
    public virtual Location? DefaultLocation { get; set; }

    [ForeignKey("ExposureTypeID")]
    [InverseProperty("Checklists")]
    public virtual ExposureType? ExposureType { get; set; }

    [InverseProperty("Checklist")]
    public virtual ICollection<ExposureTypeTraining> ExposureTypeTrainings { get; set; } = new List<ExposureTypeTraining>();

    [InverseProperty("Checklist")]
    public virtual ICollection<FavouriteChecklist> FavouriteChecklists { get; set; } = new List<FavouriteChecklist>();

    [InverseProperty("SignOffChecklist")]
    public virtual ICollection<Checklist> InverseSignOffChecklist { get; set; } = new List<Checklist>();

    [ForeignKey("ManagerEmployeeID")]
    [InverseProperty("Checklists")]
    public virtual Employee? ManagerEmployee { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ChecklistModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("OrgGroupID")]
    [InverseProperty("Checklists")]
    public virtual OrgGroup? OrgGroup { get; set; }

    [ForeignKey("RenewalFrequencyTypeID")]
    [InverseProperty("Checklists")]
    public virtual FrequencyType? RenewalFrequencyType { get; set; }

    [ForeignKey("SectorTypeID")]
    [InverseProperty("Checklists")]
    public virtual SectorType? SectorType { get; set; }

    [ForeignKey("SignOffChecklistID")]
    [InverseProperty("InverseSignOffChecklist")]
    public virtual Checklist? SignOffChecklist { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("Checklists")]
    public virtual UserArea? UserArea { get; set; }
}
