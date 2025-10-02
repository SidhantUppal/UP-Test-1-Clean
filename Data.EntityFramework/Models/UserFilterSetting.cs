using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserFilterSetting", Schema = "V7")]
public partial class UserFilterSetting
{
    [Key]
    public int UserFilterSettingID { get; set; }

    public int UserAreaID { get; set; }

    public int? UserID { get; set; }

    [StringLength(50)]
    public string ControllerName { get; set; } = null!;

    [StringLength(50)]
    public string ActionName { get; set; } = null!;

    public bool? IsDefaultExpanded { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? DefaultOrderValue { get; set; }

    [ForeignKey("UserID")]
    [InverseProperty("UserFilterSettings")]
    public virtual User? User { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserFilterSettings")]
    public virtual UserArea UserArea { get; set; } = null!;
}
