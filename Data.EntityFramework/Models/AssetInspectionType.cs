using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AssetInspectionType", Schema = "V7")]
public partial class AssetInspectionType
{
    [Key]
    public int AssetInspectionTypeID { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    public int UserAreaID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    [InverseProperty("AssetInspectionType")]
    public virtual ICollection<ChecklistAssetInspection> ChecklistAssetInspections { get; set; } = new List<ChecklistAssetInspection>();
}
