using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ChecklistViewModel
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

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
