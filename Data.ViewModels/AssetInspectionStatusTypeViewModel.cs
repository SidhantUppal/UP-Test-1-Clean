using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AssetInspectionStatusTypeViewModel
{
    [Key]
    public int AssetInspectionStatusTypeID { get; set; }

    [StringLength(100)]
    public string Name { get; set; } = null!;

    // Additional Properties
}
