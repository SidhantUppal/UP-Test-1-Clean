using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Asset", Schema = "V7")]
public partial class Asset
{
    [Key]
    public int AssetID { get; set; }

    public int AssetCategoryID { get; set; }

    public int AssetStatusTypeID { get; set; }

    public int UserAreaID { get; set; }

    public int? UserAreaDivisionID { get; set; }

    public int? ExpirationTaskScheduleID { get; set; }

    [StringLength(255)]
    public string? Reference { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public string? Notes { get; set; }

    [StringLength(50)]
    public string? SerialNumber { get; set; }

    [StringLength(50)]
    public string? MakeModel { get; set; }

    [StringLength(50)]
    public string? OrderNumber { get; set; }

    public DateTimeOffset? SupplierBookedDate { get; set; }

    public bool IsLive { get; set; }

    public DateTimeOffset? ExpiryDate { get; set; }

    public DateTimeOffset? PurchaseDate { get; set; }

    public DateTimeOffset? InstallationDate { get; set; }

    public int CurrencyTypeID { get; set; }

    [Column(TypeName = "numeric(10, 2)")]
    public decimal? InitialCost { get; set; }

    [Column(TypeName = "numeric(10, 2)")]
    public decimal? CurrentCost { get; set; }

    [Column(TypeName = "numeric(10, 2)")]
    public decimal? DepreciationCost { get; set; }

    public int? PurchaserEmployeeID { get; set; }

    public int? AssigneeEmployeeID { get; set; }

    [StringLength(100)]
    public string? ManufacturerName { get; set; }

    public int? SupplierID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public bool IsForDSE { get; set; }

    [InverseProperty("Asset")]
    public virtual ICollection<AssetDSEEmployee> AssetDSEEmployees { get; set; } = new List<AssetDSEEmployee>();

    [InverseProperty("MatchingAsset")]
    public virtual ICollection<AssetInspectionAllianzImportFailure> AssetInspectionAllianzImportFailures { get; set; } = new List<AssetInspectionAllianzImportFailure>();

    [InverseProperty("MatchingAsset")]
    public virtual ICollection<AssetInspectionCrimsonImportFailure> AssetInspectionCrimsonImportFailures { get; set; } = new List<AssetInspectionCrimsonImportFailure>();
}
