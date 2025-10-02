using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CostSheetCostType", Schema = "V7")]
[Index("CostSheetID", "CostTypeID", Name = "IX_CostSheetCostType_SheetType")]
public partial class CostSheetCostType
{
    [Key]
    public int CostSheetCostTypeID { get; set; }

    public int CostSheetID { get; set; }

    public int CostTypeID { get; set; }

    [Column(TypeName = "numeric(10, 2)")]
    public decimal Value { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("CostSheetCostTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CostSheetID")]
    [InverseProperty("CostSheetCostTypes")]
    public virtual CostSheet CostSheet { get; set; } = null!;

    [ForeignKey("CostTypeID")]
    [InverseProperty("CostSheetCostTypes")]
    public virtual CostType CostType { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("CostSheetCostTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("CostSheetCostTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
