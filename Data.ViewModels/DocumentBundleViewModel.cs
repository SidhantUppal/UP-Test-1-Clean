using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DocumentBundleViewModel
{
    [Key]
    public int BundleID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(255)]
    public string BundleName { get; set; } = null!;

    public string? Description { get; set; }

    [StringLength(100)]
    public string? Category { get; set; }

    [StringLength(50)]
    public string BundleType { get; set; } = null!;

    public bool RequiresSequentialSigning { get; set; }

    public bool AllowBulkSign { get; set; }

    public int? ValidityDays { get; set; }

    public bool IsActive { get; set; }

    public string? Tags { get; set; }

    public string? Metadata { get; set; }

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
