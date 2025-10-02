using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TaskScheduleNonEmployee", Schema = "V7")]
public partial class TaskScheduleNonEmployee
{
    [Key]
    public int TaskScheduleNonEmployeeID { get; set; }

    public int TaskScheduleID { get; set; }

    public int? OrgGroupID { get; set; }

    public int? LocationID { get; set; }

    public int? JobRoleID { get; set; }

    [ForeignKey("JobRoleID")]
    [InverseProperty("TaskScheduleNonEmployees")]
    public virtual JobRole? JobRole { get; set; }

    [ForeignKey("LocationID")]
    [InverseProperty("TaskScheduleNonEmployees")]
    public virtual Location? Location { get; set; }

    [ForeignKey("OrgGroupID")]
    [InverseProperty("TaskScheduleNonEmployees")]
    public virtual OrgGroup? OrgGroup { get; set; }

    [ForeignKey("TaskScheduleID")]
    [InverseProperty("TaskScheduleNonEmployees")]
    public virtual TaskSchedule TaskSchedule { get; set; } = null!;
}
