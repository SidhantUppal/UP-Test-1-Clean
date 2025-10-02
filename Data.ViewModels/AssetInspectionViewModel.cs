using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AssetInspectionViewModel
{
    [Key]
    public int AssetInspectionID { get; set; }

    public int AssetInspectionCategoryID { get; set; }

    public int AssetID { get; set; }

    public int UserAreaID { get; set; }

    public int? UserAreaDivisionID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    public DateTimeOffset InspectionDate { get; set; }

    public int? InspectorEmployeeID { get; set; }

    [StringLength(255)]
    public string? InspectorName { get; set; }

    [StringLength(255)]
    public string? InspectorCompanyName { get; set; }

    public int? LocationID { get; set; }

    public int? OrgGroupID { get; set; }

    public string? Notes { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? QuestionnaireResponseID { get; set; }

    public string? SeriousDefects { get; set; }

    public string? OtherDefects { get; set; }

    public int? AssetInspectionCrimsonImportID { get; set; }

    public bool HasFailed { get; set; }

    public string? Observations { get; set; }

    public int? AssetInspectionStatusTypeID { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
