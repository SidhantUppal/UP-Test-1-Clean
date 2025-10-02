using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DocPackItemViewModel
{
    [Key]
    public int DocPackItemID { get; set; }

    public int DocPackID { get; set; }

    [StringLength(100)]
    public string ItemTableName { get; set; } = null!;

    public int ItemOriginalID { get; set; }

    public int ItemID { get; set; }

    [StringLength(255)]
    public string ItemTitle { get; set; } = null!;

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
