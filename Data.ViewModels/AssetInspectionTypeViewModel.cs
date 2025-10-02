using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AssetInspectionTypeViewModel
{
    [Key]
    public int AssetInspectionTypeID { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    public int UserAreaID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
}
