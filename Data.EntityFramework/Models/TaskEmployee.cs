using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TaskEmployee", Schema = "V7")]
[Index("EmployeeID", Name = "IX_TaskEmployee_EmployeeID")]
[Index("TaskID", Name = "IX_TaskEmployee_TaskID")]
[Index("UserAreaID", Name = "IX_TaskEmployee_UserAreaID")]
public partial class TaskEmployee
{
    [Key]
    public int TaskEmployeeID { get; set; }

    public int TaskID { get; set; }

    public int EmployeeID { get; set; }

    public int UserAreaID { get; set; }

    public DateTimeOffset AssignmentDate { get; set; }

    [StringLength(20)]
    public string AssignmentType { get; set; } = null!;

    public DateTimeOffset? StartDateTime { get; set; }

    public int? TimeSpentMinutes { get; set; }

    public bool? NotificationSent { get; set; }

    public DateTimeOffset? NotificationSentDate { get; set; }

    public DateTimeOffset? AcknowledgedDate { get; set; }

    public bool? CompletedByThisUser { get; set; }

    public DateTimeOffset? CompletionDate { get; set; }

    [StringLength(1024)]
    public string? Notes { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("TaskID")]
    [InverseProperty("TaskEmployees")]
    public virtual BSSTask Task { get; set; } = null!;
}
