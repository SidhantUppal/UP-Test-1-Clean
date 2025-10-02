using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AssetInspectionAllianzImportSuccess", Schema = "V7")]
public partial class AssetInspectionAllianzImportSuccess
{
    [Key]
    public int AssetInspectionAllianzImportSuccessID { get; set; }

    public int AssetInspectionAllianzImportID { get; set; }

    public int AssetInspectionID { get; set; }

    [StringLength(20)]
    public string AllianzRecordID { get; set; } = null!;

    public DateTimeOffset? ProcessedDate { get; set; }

    [ForeignKey("AssetInspectionID")]
    [InverseProperty("AssetInspectionAllianzImportSuccesses")]
    public virtual AssetInspection AssetInspection { get; set; } = null!;

    [ForeignKey("AssetInspectionAllianzImportID")]
    [InverseProperty("AssetInspectionAllianzImportSuccesses")]
    public virtual AssetInspectionAllianzImport AssetInspectionAllianzImport { get; set; } = null!;
}
