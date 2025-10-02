using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AssetInspectionCrimsonImportFailure", Schema = "V7")]
public partial class AssetInspectionCrimsonImportFailure
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

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AssetInspectionCrimsonImportFailureArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("AssetInspectionCrimsonImportID")]
    [InverseProperty("AssetInspectionCrimsonImportFailures")]
    public virtual AssetInspectionCrimsonImport AssetInspectionCrimsonImport { get; set; } = null!;

    [ForeignKey("AssetInspectionStatusTypeID")]
    [InverseProperty("AssetInspectionCrimsonImportFailures")]
    public virtual AssetInspectionStatusType? AssetInspectionStatusType { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AssetInspectionCrimsonImportFailureCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("MatchingAssetID")]
    [InverseProperty("AssetInspectionCrimsonImportFailures")]
    public virtual Asset? MatchingAsset { get; set; }

    [ForeignKey("MatchingLocationID")]
    [InverseProperty("AssetInspectionCrimsonImportFailures")]
    public virtual Location? MatchingLocation { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AssetInspectionCrimsonImportFailureModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("AssetInspectionCrimsonImportFailures")]
    public virtual UserArea UserArea { get; set; } = null!;
}
