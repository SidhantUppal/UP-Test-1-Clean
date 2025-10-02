using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserCaseManagementSetting", Schema = "V7")]
public partial class UserCaseManagementSetting
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

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("UserCaseManagementSettingCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("UserCaseManagementSettingModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserID")]
    [InverseProperty("UserCaseManagementSettingUsers")]
    public virtual User User { get; set; } = null!;
}
