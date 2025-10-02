using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AssetCategoryViewModel
{
    [Key]
    public int AssetCategoryID { get; set; }

    public int? ParentAssetCategoryID { get; set; }

    public int? UserAreaID { get; set; }

    public int? UserAreaDivisionID { get; set; }

    public int? OrgGroupID { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    [StringLength(100)]
    public string? Reference { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [StringLength(100)]
    public string? RelatedAssetInspectionCategoryIDList { get; set; }

    public bool IsForDSE { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
