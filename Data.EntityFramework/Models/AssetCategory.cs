using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AssetCategory", Schema = "V7")]
public partial class AssetCategory
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
    [Unicode(false)]
    public string? RelatedAssetInspectionCategoryIDList { get; set; }

    public bool IsForDSE { get; set; }
}
