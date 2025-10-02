using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserCaseManagementSettingViewModel
{
    [Key]
    public int UserCaseManagementSettingID { get; set; }

    public int UserID { get; set; }

    [StringLength(255)]
    public string? VisibleColumns { get; set; }

    public bool ShowAssociatedOpenCasesOnly { get; set; }

    public bool EmailAdministratorOnCasePending { get; set; }

    public bool EmailReporterOnCaseCreation { get; set; }

    public bool EmailAssigneeOnCaseCreation { get; set; }

    public bool EmailSubscriberOnCaseCreation { get; set; }

    public bool EmailReporterOnCaseUpdate { get; set; }

    public bool EmailAssigneeOnCaseUpdate { get; set; }

    public bool EmailSubscriberOnCaseUpdate { get; set; }

    public bool EmailReporterWhenNoteAdded { get; set; }

    public bool EmailAssigneeWhenNoteAdded { get; set; }

    public bool EmailSubscriberWhenNoteAdded { get; set; }

    public bool EmailReporterWhenAttachmentAdded { get; set; }

    public bool EmailAssigneeWhenAttachmentAdded { get; set; }

    public bool EmailSubscriberWhenAttachmentAdded { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
}
