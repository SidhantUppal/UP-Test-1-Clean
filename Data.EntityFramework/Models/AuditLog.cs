using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AuditLog", Schema = "V7")]
public partial class AuditLog
{
    [Key]
    public int AuditLogID { get; set; }

    public int UserAreaID { get; set; }

    public int UserID { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string RecordTableName { get; set; } = null!;

    public int RecordID { get; set; }

    [StringLength(10)]
    [Unicode(false)]
    public string ChangeType { get; set; } = null!;

    public DateTimeOffset ChangeDate { get; set; }

    [StringLength(255)]
    public string? ChangeComments { get; set; }

    public string? OriginalData { get; set; }

    public string? LatestData { get; set; }

    [ForeignKey("UserID")]
    [InverseProperty("AuditLogs")]
    public virtual User User { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("AuditLogs")]
    public virtual UserArea UserArea { get; set; } = null!;
}
