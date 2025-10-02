using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("WalkResponse", Schema = "V7")]
public partial class WalkResponse
{
    [Key]
    public int WalkResponseID { get; set; }

    public int WalkID { get; set; }

    public int? WalkAssignmentID { get; set; }

    public DateTimeOffset? ActualStartTime { get; set; }

    public DateTimeOffset? ActualFinishTime { get; set; }

    public int? ActualDuration { get; set; }

    public bool HasAutoClosed { get; set; }

    [StringLength(255)]
    public string? CloseReason { get; set; }

    public int? BreachedReasonTypeID { get; set; }

    [StringLength(500)]
    public string? BreachComment { get; set; }

    public string? GPSRoute { get; set; }

    public int? RandomImageID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? EmployeeID { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("WalkResponseArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("WalkResponseCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("WalkResponses")]
    public virtual Employee? Employee { get; set; }

    [ForeignKey("WalkID")]
    [InverseProperty("WalkResponses")]
    public virtual Walk Walk { get; set; } = null!;

    [ForeignKey("WalkAssignmentID")]
    [InverseProperty("WalkResponses")]
    public virtual WalkAssignment? WalkAssignment { get; set; }

    [InverseProperty("WalkResponse")]
    public virtual ICollection<WalkCheckpointResponse> WalkCheckpointResponses { get; set; } = new List<WalkCheckpointResponse>();

    [InverseProperty("WalkResponse")]
    public virtual ICollection<WalkHazardReport> WalkHazardReports { get; set; } = new List<WalkHazardReport>();
}
