using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserUserArea", Schema = "V7")]
[Index("UserID", "UserAreaID", Name = "IX_UserUserArea_IsDisabled")]
public partial class UserUserArea
{
    [Key]
    public int UserUserAreaID { get; set; }

    public int UserID { get; set; }

    public int UserAreaID { get; set; }

    public bool IsDisabled { get; set; }

    [ForeignKey("UserID")]
    [InverseProperty("UserUserAreas")]
    public virtual User User { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserUserAreas")]
    public virtual UserArea UserArea { get; set; } = null!;
}
