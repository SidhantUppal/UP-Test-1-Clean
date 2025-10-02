using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AssetInspectionCrimsonImportSuccess", Schema = "V7")]
public partial class AssetInspectionCrimsonImportSuccess
{
    [Key]
    public int AssetInspectionCrimsonImportSuccessID { get; set; }

    public int AssetInspectionCrimsonImportID { get; set; }

    public int AssetInspectionID { get; set; }

    [StringLength(20)]
    public string CrimsonRecordID { get; set; } = null!;

    public DateTimeOffset? ProcessedDate { get; set; }

    [ForeignKey("AssetInspectionID")]
    [InverseProperty("AssetInspectionCrimsonImportSuccesses")]
    public virtual AssetInspection AssetInspection { get; set; } = null!;

    [ForeignKey("AssetInspectionCrimsonImportID")]
    [InverseProperty("AssetInspectionCrimsonImportSuccesses")]
    public virtual AssetInspectionCrimsonImport AssetInspectionCrimsonImport { get; set; } = null!;
}
