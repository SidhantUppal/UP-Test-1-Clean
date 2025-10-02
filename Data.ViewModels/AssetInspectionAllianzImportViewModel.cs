using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AssetInspectionAllianzImportViewModel
{
    [Key]
    public int AssetInspectionAllianzImportID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(30)]
    public string XMLFileName { get; set; } = null!;

    [StringLength(20)]
    public string XMLID { get; set; } = null!;

    public string XMLReport { get; set; } = null!;

    public int TotalRecords { get; set; }

    public DateTimeOffset ImportDate { get; set; }

    public DateTimeOffset? ProcessedDate { get; set; }

    // Additional Properties
}
