using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AssetInspectionCrimsonImportViewModel
{
    [Key]
    public int AssetInspectionCrimsonImportID { get; set; }

    [StringLength(30)]
    public string XMLFileName { get; set; } = null!;

    [StringLength(20)]
    public string XMLID { get; set; } = null!;

    public string XMLReport { get; set; } = null!;

    public DateTimeOffset ImportDate { get; set; }

    public int UserAreaID { get; set; }

    public int TotalRecords { get; set; }

    public DateTimeOffset? ProcessedDate { get; set; }

    // Additional Properties
}
