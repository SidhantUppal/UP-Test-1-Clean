using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ChecklistAssetInspectionViewModel
{
    [Key]
    public int ChecklistAssetInspectionID { get; set; }

    public int AssetInspectionTypeID { get; set; }

    public int ChecklistID { get; set; }

    // Additional Properties
}
