using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AssetInspectionCrimsonImportFailureViewModel
{
    [Key]
    public int AssetInspectionCrimsonImportFailureID { get; set; }

    public int AssetInspectionCrimsonImportID { get; set; }

    [StringLength(20)]
    public string CrimsonRecordID { get; set; } = null!;

    [StringLength(20)]
    public string CrimsonReportID { get; set; } = null!;

    public int UserAreaID { get; set; }

    public int? MatchingAssetID { get; set; }

    public int? MatchingLocationID { get; set; }

    public bool IsProcessed { get; set; }

    public string? Notes { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? AssetInspectionStatusTypeID { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
