using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CostSheet", Schema = "V7")]
public partial class CostSheet
{
    [Key]
    public int CostSheetID { get; set; }

    public int AccidentCaseID { get; set; }

    public int CostToReputationTypeID { get; set; }

    public int? CurrencyTypeID { get; set; }

    [Column(TypeName = "numeric(10, 2)")]
    public decimal TotalCost { get; set; }

    [Column(TypeName = "numeric(10, 2)")]
    public decimal TotalHours { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("AccidentCaseID")]
    [InverseProperty("CostSheets")]
    public virtual AccidentCase AccidentCase { get; set; } = null!;

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("CostSheetArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("CostSheet")]
    public virtual ICollection<CostSheetCostType> CostSheetCostTypes { get; set; } = new List<CostSheetCostType>();

    [ForeignKey("CostToReputationTypeID")]
    [InverseProperty("CostSheets")]
    public virtual CostToReputationType CostToReputationType { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("CostSheetCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("CurrencyTypeID")]
    [InverseProperty("CostSheets")]
    public virtual CurrencyType? CurrencyType { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("CostSheetModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }
}
