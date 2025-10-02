using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaTaskType", Schema = "V7")]
public partial class UserAreaTaskType
{
    [Key]
    public int UserAreaTaskTypeID { get; set; }

    public int TaskTypeID { get; set; }

    public int UserAreaID { get; set; }

    [ForeignKey("TaskTypeID")]
    [InverseProperty("UserAreaTaskTypes")]
    public virtual TaskType TaskType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaTaskTypes")]
    public virtual UserArea UserArea { get; set; } = null!;
}
