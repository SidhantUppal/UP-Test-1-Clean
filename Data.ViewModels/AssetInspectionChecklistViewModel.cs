using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AssetInspectionChecklistViewModel
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

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
