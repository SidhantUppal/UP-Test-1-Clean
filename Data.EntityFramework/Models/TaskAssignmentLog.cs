using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TaskAssignmentLog", Schema = "V7")]
[Index("TaskID", "EmployeeID", Name = "IX_TaskAssignmentLog_TaskIDEmployeeID")]
public partial class TaskAssignmentLog
{
    [Key]
    public int TaskAssignmentLogID { get; set; }

    public int UserAreaID { get; set; }

    public int TaskID { get; set; }

    public int EmployeeID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("TaskAssignmentLogArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("TaskAssignmentLogCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("TaskAssignmentLogs")]
    public virtual Employee Employee { get; set; } = null!;

    [ForeignKey("TaskID")]
    [InverseProperty("TaskAssignmentLogs")]
    public virtual BSSTask Task { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("TaskAssignmentLogs")]
    public virtual UserArea UserArea { get; set; } = null!;
}
