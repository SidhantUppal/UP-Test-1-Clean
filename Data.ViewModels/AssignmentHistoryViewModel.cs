using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AssignmentHistoryViewModel
{
    [Key]
    public int HistoryID { get; set; }

    public int AssignmentID { get; set; }

    [StringLength(100)]
    public string Action { get; set; } = null!;

    public int PerformedByUserID { get; set; }

    public DateTimeOffset ActionDate { get; set; }

    [StringLength(50)]
    public string? OldStatus { get; set; }

    [StringLength(50)]
    public string? NewStatus { get; set; }

    public string? Notes { get; set; }

    [StringLength(50)]
    public string? IPAddress { get; set; }

    public string? Metadata { get; set; }

    // Additional Properties
}
