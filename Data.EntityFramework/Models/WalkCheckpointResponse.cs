using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("WalkCheckpointResponse", Schema = "V7")]
public partial class WalkCheckpointResponse
{
    [Key]
    public int WalkCheckpointResponseID { get; set; }

    public int WalkResponseID { get; set; }

    public int WalkCheckpointID { get; set; }

    public DateTimeOffset? StartCheckedTime { get; set; }

    public DateTimeOffset? EndCheckedTime { get; set; }

    public bool CheckedStatus { get; set; }

    public int ConfirmationTypeID { get; set; }

    [StringLength(500)]
    public string ConfirmationComment { get; set; } = null!;

    [StringLength(100)]
    public string? ResponseText { get; set; }

    public int? AttachmentID { get; set; }

    public string? GPSCoordinates { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("WalkCheckpointResponseArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("WalkCheckpointResponseCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("WalkCheckpointID")]
    [InverseProperty("WalkCheckpointResponses")]
    public virtual WalkCheckpoint WalkCheckpoint { get; set; } = null!;

    [ForeignKey("WalkResponseID")]
    [InverseProperty("WalkCheckpointResponses")]
    public virtual WalkResponse WalkResponse { get; set; } = null!;
}
