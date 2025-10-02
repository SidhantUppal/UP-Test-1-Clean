using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AssetInspectionStatusType", Schema = "V7")]
public partial class AssetInspectionStatusType
{
    [Key]
    public int AssetInspectionStatusTypeID { get; set; }

    [StringLength(100)]
    public string Name { get; set; } = null!;

    [InverseProperty("AssetInspectionStatusType")]
    public virtual ICollection<AssetInspectionAllianzImportFailure> AssetInspectionAllianzImportFailures { get; set; } = new List<AssetInspectionAllianzImportFailure>();

    [InverseProperty("AssetInspectionStatusType")]
    public virtual ICollection<AssetInspectionCrimsonImportFailure> AssetInspectionCrimsonImportFailures { get; set; } = new List<AssetInspectionCrimsonImportFailure>();
}
