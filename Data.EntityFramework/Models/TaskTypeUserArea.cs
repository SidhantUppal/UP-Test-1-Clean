using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TaskTypeUserArea", Schema = "V7")]
[Index("TaskTypeID", "UserAreaID", Name = "CK_TaskTypeUserArea_Unique", IsUnique = true)]
[Index("TaskTypeID", Name = "IX_TaskTypeUserArea_TaskTypeID")]
[Index("UserAreaID", Name = "IX_TaskTypeUserArea_UserAreaID")]
public partial class TaskTypeUserArea
{
    [Key]
    public int TaskTypeUserAreaID { get; set; }

    public int TaskTypeID { get; set; }

    public int UserAreaID { get; set; }

    [ForeignKey("TaskTypeID")]
    [InverseProperty("TaskTypeUserAreas")]
    public virtual TaskType TaskType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("TaskTypeUserAreas")]
    public virtual UserArea UserArea { get; set; } = null!;
}
