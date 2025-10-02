using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TaskScheduleEmployee", Schema = "V7")]
[Index("EmployeeID", Name = "IX_TaskScheduleEmployee_EmployeeID")]
[Index("TaskScheduleID", Name = "IX_TaskScheduleEmployee_TaskScheduleID_includes")]
public partial class TaskScheduleEmployee
{
    [Key]
    public int TaskScheduleEmployeeID { get; set; }

    public int TaskScheduleID { get; set; }

    public int EmployeeID { get; set; }

    [ForeignKey("EmployeeID")]
    [InverseProperty("TaskScheduleEmployees")]
    public virtual Employee Employee { get; set; } = null!;

    [ForeignKey("TaskScheduleID")]
    [InverseProperty("TaskScheduleEmployees")]
    public virtual TaskSchedule TaskSchedule { get; set; } = null!;
}
