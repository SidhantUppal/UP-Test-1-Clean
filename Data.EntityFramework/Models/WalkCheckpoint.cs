using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("WalkCheckpoint", Schema = "V7")]
public partial class WalkCheckpoint
{
    [Key]
    public int WalkCheckpointID { get; set; }

    public int? LocationID { get; set; }

    public int WalkID { get; set; }

    public string Description { get; set; } = null!;

    [StringLength(255)]
    public string? PositiveText { get; set; }

    [StringLength(255)]
    public string? NegativeText { get; set; }

    [StringLength(100)]
    public string ConfirmationTypes { get; set; } = null!;

    public int OrderNum { get; set; }

    public int ResponseTypeID { get; set; }

    public int? TravelTime { get; set; }

    public int? Duration { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("WalkCheckpointArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("WalkCheckpointCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("LocationID")]
    [InverseProperty("WalkCheckpoints")]
    public virtual Location? Location { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("WalkCheckpointModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("WalkID")]
    [InverseProperty("WalkCheckpoints")]
    public virtual Walk Walk { get; set; } = null!;

    [InverseProperty("WalkCheckpoint")]
    public virtual ICollection<WalkCheckpointResponse> WalkCheckpointResponses { get; set; } = new List<WalkCheckpointResponse>();

    [InverseProperty("WalkCheckpoint")]
    public virtual ICollection<WalkHazardReport> WalkHazardReports { get; set; } = new List<WalkHazardReport>();
}
