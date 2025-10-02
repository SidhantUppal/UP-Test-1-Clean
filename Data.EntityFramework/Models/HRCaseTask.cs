using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HRCaseTask", Schema = "V7")]
[Index("TaskID", "HRCaseID", "HRCaseMeetingID", "HRCaseEventID", Name = "CK_HRCaseTask_Unique", IsUnique = true)]
[Index("HRCaseID", Name = "IX_HRCaseTask_HRCaseID_includes")]
public partial class HRCaseTask
{
    [Key]
    public int HRCaseTaskID { get; set; }

    public int TaskID { get; set; }

    public int HRCaseID { get; set; }

    public int? HRCaseStatusTypeID { get; set; }

    public int? HRCaseMeetingID { get; set; }

    public int? HRCaseEventID { get; set; }

    [StringLength(255)]
    public string? RelatedUserIDList { get; set; }

    [ForeignKey("HRCaseID")]
    [InverseProperty("HRCaseTasks")]
    public virtual HRCase HRCase { get; set; } = null!;

    [InverseProperty("HRCaseTask")]
    public virtual ICollection<HRCaseAttachment> HRCaseAttachments { get; set; } = new List<HRCaseAttachment>();

    [ForeignKey("HRCaseEventID")]
    [InverseProperty("HRCaseTasks")]
    public virtual HRCaseEvent? HRCaseEvent { get; set; }

    [ForeignKey("HRCaseMeetingID")]
    [InverseProperty("HRCaseTasks")]
    public virtual HRCaseMeeting? HRCaseMeeting { get; set; }

    [ForeignKey("HRCaseStatusTypeID")]
    [InverseProperty("HRCaseTasks")]
    public virtual HRCaseStatusType? HRCaseStatusType { get; set; }

    [ForeignKey("TaskID")]
    [InverseProperty("HRCaseTasks")]
    public virtual BSSTask Task { get; set; } = null!;
}
