using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AuditLogViewModel
{
    [Key]
    public int AuditLogID { get; set; }

    public int UserAreaID { get; set; }

    public int UserID { get; set; }

    [StringLength(50)]
    public string RecordTableName { get; set; } = null!;

    public int RecordID { get; set; }

    [StringLength(10)]
    public string ChangeType { get; set; } = null!;

    public DateTimeOffset ChangeDate { get; set; }

    [StringLength(255)]
    public string? ChangeComments { get; set; }

    public string? OriginalData { get; set; }

    public string? LatestData { get; set; }

    // Additional Properties
}
