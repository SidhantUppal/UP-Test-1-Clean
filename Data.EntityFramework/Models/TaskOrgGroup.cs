using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TaskOrgGroup", Schema = "V7")]
[Index("TaskID", Name = "IX_TaskOrgGroup_TaskID_includes")]
public partial class TaskOrgGroup
{
    [Key]
    public int TaskOrgGroupID { get; set; }

    public int TaskID { get; set; }

    public int OrgGroupID { get; set; }

    [ForeignKey("OrgGroupID")]
    [InverseProperty("TaskOrgGroups")]
    public virtual OrgGroup OrgGroup { get; set; } = null!;

    [ForeignKey("TaskID")]
    [InverseProperty("TaskOrgGroups")]
    public virtual BSSTask Task { get; set; } = null!;
}
