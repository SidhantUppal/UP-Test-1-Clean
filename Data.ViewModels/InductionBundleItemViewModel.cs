using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class InductionBundleItemViewModel
{
    [Key]
    public int InductionBundleItemID { get; set; }

    public int InductionBundleID { get; set; }

    public int ElementTypeID { get; set; }

    public int? ElementID { get; set; }

    public int? DocumentLinkTableTypeID { get; set; }

    [StringLength(255)]
    public string? DocumentTitle { get; set; }

    public string? DocumentURL { get; set; }

    public int? AttachmentID { get; set; }

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
