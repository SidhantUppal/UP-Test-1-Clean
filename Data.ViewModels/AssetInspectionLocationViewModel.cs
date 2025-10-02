using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AssetInspectionLocationViewModel
{
    [Key]
    public int AssetInspectionLocationID { get; set; }

    public int AssetInspectionID { get; set; }

    public int LocationID { get; set; }

    // Additional Properties
}
