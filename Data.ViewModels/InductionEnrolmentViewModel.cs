using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class InductionEnrolmentViewModel
{
    [Key]
    public int InductionEnrolmentID { get; set; }

    public int InductionAllocationID { get; set; }

    public int InductionBundleItemID { get; set; }

    public int UserAreaID { get; set; }

    public bool? IsPassed { get; set; }

    public DateTimeOffset? StartDate { get; set; }

    public DateTimeOffset? CompletedDate { get; set; }

    [StringLength(100)]
    public string? CompletedByFullName { get; set; }

    public string? CompletedBySignature { get; set; }

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
