using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AssetInspectionCrimsonImport", Schema = "V7")]
public partial class AssetInspectionCrimsonImport
{
    [Key]
    public int AssetInspectionCrimsonImportID { get; set; }

    [StringLength(30)]
    public string XMLFileName { get; set; } = null!;

    [StringLength(20)]
    public string XMLID { get; set; } = null!;

    [Column(TypeName = "xml")]
    public string XMLReport { get; set; } = null!;

    public DateTimeOffset ImportDate { get; set; }

    public int UserAreaID { get; set; }

    public int TotalRecords { get; set; }

    public DateTimeOffset? ProcessedDate { get; set; }

    [InverseProperty("AssetInspectionCrimsonImport")]
    public virtual ICollection<AssetInspectionCrimsonImportFailure> AssetInspectionCrimsonImportFailures { get; set; } = new List<AssetInspectionCrimsonImportFailure>();

    [InverseProperty("AssetInspectionCrimsonImport")]
    public virtual ICollection<AssetInspectionCrimsonImportSuccess> AssetInspectionCrimsonImportSuccesses { get; set; } = new List<AssetInspectionCrimsonImportSuccess>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("AssetInspectionCrimsonImports")]
    public virtual UserArea UserArea { get; set; } = null!;
}
