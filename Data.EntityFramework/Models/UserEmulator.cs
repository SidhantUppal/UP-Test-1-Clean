using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserEmulator", Schema = "V7")]
public partial class UserEmulator
{
    [Key]
    public int UserEmulatorID { get; set; }

    public int UserID { get; set; }

    public int? PermittedUserAreaID { get; set; }

    [ForeignKey("PermittedUserAreaID")]
    [InverseProperty("UserEmulators")]
    public virtual UserArea? PermittedUserArea { get; set; }

    [ForeignKey("UserID")]
    [InverseProperty("UserEmulators")]
    public virtual User User { get; set; } = null!;
}
