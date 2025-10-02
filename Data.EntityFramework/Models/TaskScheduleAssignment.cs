using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TaskScheduleAssignment", Schema = "V7")]
[Index("TaskScheduleID", Name = "IX_TaskScheduleAssignment_TaskScheduleID")]
public partial class TaskScheduleAssignment
{
    [Key]
    public int TaskScheduleAssignmentID { get; set; }

    public int TaskScheduleID { get; set; }

    public int? EmployeeID { get; set; }

    public int? LocationID { get; set; }

    public int? OrgGroupID { get; set; }

    [ForeignKey("EmployeeID")]
    [InverseProperty("TaskScheduleAssignments")]
    public virtual Employee? Employee { get; set; }

    [ForeignKey("LocationID")]
    [InverseProperty("TaskScheduleAssignments")]
    public virtual Location? Location { get; set; }

    [ForeignKey("OrgGroupID")]
    [InverseProperty("TaskScheduleAssignments")]
    public virtual OrgGroup? OrgGroup { get; set; }

    [ForeignKey("TaskScheduleID")]
    [InverseProperty("TaskScheduleAssignments")]
    public virtual TaskSchedule TaskSchedule { get; set; } = null!;
}
