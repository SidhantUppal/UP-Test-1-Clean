using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DocumentViewLog", Schema = "V7")]
[Index("DocumentID", Name = "IX_DocumentViewLog_DocumentID")]
[Index("UserID", Name = "IX_DocumentViewLog_UserID")]
[Index("ViewedAt", Name = "IX_DocumentViewLog_ViewedAt")]
public partial class DocumentViewLog
{
    [Key]
    public int ViewLogID { get; set; }

    public int DocumentID { get; set; }

    public int UserID { get; set; }

    public DateTimeOffset ViewedAt { get; set; }

    [StringLength(50)]
    public string ViewMethod { get; set; } = null!;

    public int? ViewDurationSeconds { get; set; }

    [StringLength(50)]
    public string? IPAddress { get; set; }

    [StringLength(500)]
    public string? UserAgent { get; set; }

    [StringLength(255)]
    public string? GeographicLocation { get; set; }

    [ForeignKey("DocumentID")]
    [InverseProperty("DocumentViewLogs")]
    public virtual Document Document { get; set; } = null!;

    [ForeignKey("UserID")]
    [InverseProperty("DocumentViewLogs")]
    public virtual User User { get; set; } = null!;
}
