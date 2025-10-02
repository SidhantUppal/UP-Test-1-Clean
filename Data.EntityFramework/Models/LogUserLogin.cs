using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("LogUserLogin", Schema = "V7")]
[Index("UserID", Name = "IX_LogUserLogin_User")]
[Index("UserAreaID", Name = "IX_LogUserLogin_UserArea")]
public partial class LogUserLogin
{
    [Key]
    public int LogUserLoginID { get; set; }

    public int UserAreaID { get; set; }

    public int UserID { get; set; }

    public DateTimeOffset DateTime { get; set; }

    [StringLength(36)]
    public string? GUID { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string? SessionID { get; set; }

    public DateTimeOffset? LogoutDateTime { get; set; }

    [ForeignKey("UserID")]
    [InverseProperty("LogUserLogins")]
    public virtual User User { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("LogUserLogins")]
    public virtual UserArea UserArea { get; set; } = null!;
}
