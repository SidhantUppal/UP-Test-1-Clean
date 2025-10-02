using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TribunalCaseDistributionViewModel
{
    [Key]
    public int TribunalCaseDistributionID { get; set; }

    public int TribunalCaseID { get; set; }

    public int UserAreaID { get; set; }

    public int? UserID { get; set; }

    [StringLength(150)]
    public string RecipientName { get; set; } = null!;

    [StringLength(255)]
    public string? RecipientEmail { get; set; }

    public bool HasBeenPosted { get; set; }

    public bool HasBeenEmailed { get; set; }

    public bool HasConfirmedReceipt { get; set; }

    public DateTimeOffset? PostedDate { get; set; }

    public DateTimeOffset? EmailedDate { get; set; }

    public DateTimeOffset? ReceiptDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
