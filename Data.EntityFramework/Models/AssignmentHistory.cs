using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AssignmentHistory", Schema = "V7")]
[Index("ActionDate", Name = "IX_AssignmentHistory_ActionDate")]
[Index("AssignmentID", Name = "IX_AssignmentHistory_AssignmentID")]
[Index("PerformedByUserID", Name = "IX_AssignmentHistory_PerformedByUserID")]
public partial class AssignmentHistory
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

    [ForeignKey("AssignmentID")]
    [InverseProperty("AssignmentHistories")]
    public virtual DocumentAssignment Assignment { get; set; } = null!;

    [ForeignKey("PerformedByUserID")]
    [InverseProperty("AssignmentHistories")]
    public virtual User PerformedByUser { get; set; } = null!;
}
