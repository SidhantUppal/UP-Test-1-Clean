using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AssetInspectionAllianzImport", Schema = "V7")]
public partial class AssetInspectionAllianzImport
{
    [Key]
    public int AssetInspectionAllianzImportID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(30)]
    public string XMLFileName { get; set; } = null!;

    [StringLength(20)]
    public string XMLID { get; set; } = null!;

    [Column(TypeName = "xml")]
    public string XMLReport { get; set; } = null!;

    public int TotalRecords { get; set; }

    public DateTimeOffset ImportDate { get; set; }

    public DateTimeOffset? ProcessedDate { get; set; }

    [InverseProperty("AssetInspectionAllianzImport")]
    public virtual ICollection<AssetInspectionAllianzImportFailure> AssetInspectionAllianzImportFailures { get; set; } = new List<AssetInspectionAllianzImportFailure>();

    [InverseProperty("AssetInspectionAllianzImport")]
    public virtual ICollection<AssetInspectionAllianzImportSuccess> AssetInspectionAllianzImportSuccesses { get; set; } = new List<AssetInspectionAllianzImportSuccess>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("AssetInspectionAllianzImports")]
    public virtual UserArea UserArea { get; set; } = null!;
}
