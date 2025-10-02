using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AssetDSEEmployee", Schema = "V7")]
[Index("AssetID", "EmployeeID", Name = "IX_AssetDSEEmployee_AssetEmployee")]
[Index("EmployeeID", Name = "IX_AssetDSEEmployee_EmployeeID")]
public partial class AssetDSEEmployee
{
    [Key]
    public int AssetDSEEmployeeID { get; set; }

    public int AssetID { get; set; }

    public int EmployeeID { get; set; }

    public int AssetStatusTypeID { get; set; }

    public DateTimeOffset AssignmentDate { get; set; }

    [StringLength(255)]
    public string? Comments { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AssetDSEEmployeeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("AssetID")]
    [InverseProperty("AssetDSEEmployees")]
    public virtual Asset Asset { get; set; } = null!;

    [ForeignKey("AssetStatusTypeID")]
    [InverseProperty("AssetDSEEmployees")]
    public virtual AssetStatusType AssetStatusType { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AssetDSEEmployeeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeID")]
    [InverseProperty("AssetDSEEmployees")]
    public virtual Employee Employee { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AssetDSEEmployeeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
