using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HRCasePing", Schema = "V7")]
[Index("HRCaseID", "UserID", "EmulatingUserID", Name = "IX_HRCasePing_HRCaseID_includes")]
public partial class HRCasePing
{
    [Key]
    public int HRCasePingID { get; set; }

    public int HRCaseID { get; set; }

    public int UserID { get; set; }

    public int? EmulatingUserID { get; set; }

    public DateTimeOffset DateTime { get; set; }

    public bool IsViaAJAX { get; set; }

    [StringLength(36)]
    public string? SessionID { get; set; }

    [ForeignKey("EmulatingUserID")]
    [InverseProperty("HRCasePingEmulatingUsers")]
    public virtual User? EmulatingUser { get; set; }

    [ForeignKey("HRCaseID")]
    [InverseProperty("HRCasePings")]
    public virtual HRCase HRCase { get; set; } = null!;

    [ForeignKey("UserID")]
    [InverseProperty("HRCasePingUsers")]
    public virtual User User { get; set; } = null!;
}
