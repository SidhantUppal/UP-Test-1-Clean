using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TaskScheduleOrgGroup", Schema = "V7")]
public partial class TaskScheduleOrgGroup
{
    [Key]
    public int TaskScheduleOrgGroupID { get; set; }

    public int TaskScheduleID { get; set; }

    public int OrgGroupID { get; set; }

    [ForeignKey("OrgGroupID")]
    [InverseProperty("TaskScheduleOrgGroups")]
    public virtual OrgGroup OrgGroup { get; set; } = null!;

    [ForeignKey("TaskScheduleID")]
    [InverseProperty("TaskScheduleOrgGroups")]
    public virtual TaskSchedule TaskSchedule { get; set; } = null!;
}
