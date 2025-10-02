using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class WalkCheckpointViewModel
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

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
