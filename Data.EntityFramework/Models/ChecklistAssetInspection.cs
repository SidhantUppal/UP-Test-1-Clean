using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ChecklistAssetInspection", Schema = "V7")]
public partial class ChecklistAssetInspection
{
    [Key]
    public int ChecklistAssetInspectionID { get; set; }

    public int AssetInspectionTypeID { get; set; }

    public int ChecklistID { get; set; }

    [ForeignKey("AssetInspectionTypeID")]
    [InverseProperty("ChecklistAssetInspections")]
    public virtual AssetInspectionType AssetInspectionType { get; set; } = null!;

    [ForeignKey("ChecklistID")]
    [InverseProperty("ChecklistAssetInspections")]
    public virtual Checklist Checklist { get; set; } = null!;
}
