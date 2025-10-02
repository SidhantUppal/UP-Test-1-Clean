using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AssetInspectionAllianzImportFailure", Schema = "V7")]
public partial class AssetInspectionAllianzImportFailure
{
    [Key]
    public int AssetInspectionAllianzImportFailureID { get; set; }

    public int AssetInspectionAllianzImportID { get; set; }

    [StringLength(20)]
    public string AllianzRecordID { get; set; } = null!;

    [StringLength(20)]
    public string AllianzReportID { get; set; } = null!;

    public int UserAreaID { get; set; }

    public int? AssetInspectionStatusTypeID { get; set; }

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

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AssetInspectionAllianzImportFailureArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("AssetInspectionAllianzImportID")]
    [InverseProperty("AssetInspectionAllianzImportFailures")]
    public virtual AssetInspectionAllianzImport AssetInspectionAllianzImport { get; set; } = null!;

    [ForeignKey("AssetInspectionStatusTypeID")]
    [InverseProperty("AssetInspectionAllianzImportFailures")]
    public virtual AssetInspectionStatusType? AssetInspectionStatusType { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AssetInspectionAllianzImportFailureCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("MatchingAssetID")]
    [InverseProperty("AssetInspectionAllianzImportFailures")]
    public virtual Asset? MatchingAsset { get; set; }

    [ForeignKey("MatchingLocationID")]
    [InverseProperty("AssetInspectionAllianzImportFailures")]
    public virtual Location? MatchingLocation { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AssetInspectionAllianzImportFailureModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("AssetInspectionAllianzImportFailures")]
    public virtual UserArea UserArea { get; set; } = null!;
}
