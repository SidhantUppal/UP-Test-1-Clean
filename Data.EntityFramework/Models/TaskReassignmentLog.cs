using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TaskReassignmentLog", Schema = "V7")]
[Index("UserAreaID", "TaskID", Name = "IX_TaskReassignmentLog_UserAreaTaskID")]
public partial class TaskReassignmentLog
{
    [Key]
    public int TaskReassignmentLogID { get; set; }

    public int UserAreaID { get; set; }

    public int? TaskID { get; set; }

    public int? TaskScheduleID { get; set; }

    [StringLength(256)]
    public string? PreviousEmployeeIDs { get; set; }

    [StringLength(256)]
    public string? CurrentEmployeeIDs { get; set; }

    public string ReassignmentNotes { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("TaskReassignmentLogs")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("TaskID")]
    [InverseProperty("TaskReassignmentLogs")]
    public virtual BSSTask? Task { get; set; }

    [ForeignKey("TaskScheduleID")]
    [InverseProperty("TaskReassignmentLogs")]
    public virtual TaskSchedule? TaskSchedule { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("TaskReassignmentLogs")]
    public virtual UserArea UserArea { get; set; } = null!;
}
