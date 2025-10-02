using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AssetInspectionAllianzImportSuccessViewModel
{
    [Key]
    public int AssetInspectionAllianzImportSuccessID { get; set; }

    public int AssetInspectionAllianzImportID { get; set; }

    public int AssetInspectionID { get; set; }

    [StringLength(20)]
    public string AllianzRecordID { get; set; } = null!;

    public DateTimeOffset? ProcessedDate { get; set; }

    // Additional Properties
}
