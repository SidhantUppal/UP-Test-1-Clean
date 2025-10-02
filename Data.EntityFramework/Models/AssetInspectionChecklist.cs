using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AssetInspectionChecklist", Schema = "V7")]
public partial class AssetInspectionChecklist
{
    [Key]
    public int AssetInspectionChecklistID { get; set; }

    public int UserAreaID { get; set; }

    public int ChecklistID { get; set; }

    public int QuestionnaireID { get; set; }

    public int? QuestionnaireResponseID { get; set; }

    public int? AssetCategoryID { get; set; }

    public int? AssetID { get; set; }

    public string? MultiAssetIDs { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? TaskID { get; set; }

    public int? AssetInspectionMode { get; set; }
}
