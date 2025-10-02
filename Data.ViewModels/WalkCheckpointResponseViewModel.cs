using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class WalkCheckpointResponseViewModel
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

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
