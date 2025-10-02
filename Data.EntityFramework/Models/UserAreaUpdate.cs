using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaUpdate", Schema = "V7")]
[Index("UserAreaID", Name = "IX_UserAreaUpdate_UserAreaID_includes")]
public partial class UserAreaUpdate
{
    [Key]
    public int UserAreaUpdateID { get; set; }

    public int UserAreaID { get; set; }

    public int UpdateID { get; set; }

    [ForeignKey("UpdateID")]
    [InverseProperty("UserAreaUpdates")]
    public virtual Update Update { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaUpdates")]
    public virtual UserArea UserArea { get; set; } = null!;
}
