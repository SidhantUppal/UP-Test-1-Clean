using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CostType", Schema = "V7")]
public partial class CostType
{
    [Key]
    public int CostTypeID { get; set; }

    public int CostUnitTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(20)]
    public string Reference { get; set; } = null!;

    public int OrderNum { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public int? ArchivedByUserID { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("CostTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("CostType")]
    public virtual ICollection<CostSheetCostType> CostSheetCostTypes { get; set; } = new List<CostSheetCostType>();

    [ForeignKey("CostUnitTypeID")]
    [InverseProperty("CostTypes")]
    public virtual CostUnitType CostUnitType { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("CostTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("CostTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("CostTypes")]
    public virtual UserArea? UserArea { get; set; }

    [InverseProperty("CostType")]
    public virtual ICollection<UserAreaCostType> UserAreaCostTypes { get; set; } = new List<UserAreaCostType>();
}
