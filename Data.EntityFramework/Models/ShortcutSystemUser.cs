using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ShortcutSystemUser", Schema = "Report")]
public partial class ShortcutSystemUser
{
    [Key]
    public int ShortcutSystemUserID { get; set; }

    public int ShortcutSystemID { get; set; }

    public int UserID { get; set; }

    [ForeignKey("ShortcutSystemID")]
    [InverseProperty("ShortcutSystemUsers")]
    public virtual ShortcutSystem ShortcutSystem { get; set; } = null!;

    [ForeignKey("UserID")]
    [InverseProperty("ShortcutSystemUsers")]
    public virtual User User { get; set; } = null!;
}
