using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AssetInspectionCrimsonImportSuccessViewModel
{
    [Key]
    public int AssetInspectionCrimsonImportSuccessID { get; set; }

    public int AssetInspectionCrimsonImportID { get; set; }

    public int AssetInspectionID { get; set; }

    [StringLength(20)]
    public string CrimsonRecordID { get; set; } = null!;

    public DateTimeOffset? ProcessedDate { get; set; }

    // Additional Properties
}
