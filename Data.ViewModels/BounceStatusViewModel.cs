using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class BounceStatusViewModel
{
    [Key]
    public int BounceStatusID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(255)]
    public string EmailAddress { get; set; } = null!;

    public int? UserID { get; set; }

    [StringLength(50)]
    public string BounceType { get; set; } = null!;

    public string? BounceReason { get; set; }

    public DateTimeOffset FirstBounceDate { get; set; }

    public DateTimeOffset LastBounceDate { get; set; }

    public int BounceCount { get; set; }

    public DateTimeOffset? OooReturnDate { get; set; }

    public string? OooMessage { get; set; }

    public bool IsActive { get; set; }

    public DateTimeOffset? ResolvedDate { get; set; }

    public int? ResolvedByUserID { get; set; }

    public int? InboundEmailID { get; set; }

    public string? LlmAnalysis { get; set; }

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
