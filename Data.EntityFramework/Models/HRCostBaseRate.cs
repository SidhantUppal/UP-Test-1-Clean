using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HRCostBaseRate", Schema = "V7")]
public partial class HRCostBaseRate
{
    [Key]
    public int HRCostBaseRateID { get; set; }

    [Column(TypeName = "decimal(8, 2)")]
    public decimal Tier1AnnualCostGBP { get; set; }

    [Column(TypeName = "decimal(8, 2)")]
    public decimal Tier2AnnualCostGBP { get; set; }

    [Column(TypeName = "decimal(8, 2)")]
    public decimal Tier3AnnualCostGBP { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("HRCostBaseRates")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("HRCostBaseRate")]
    public virtual ICollection<UserAreaHRCost> UserAreaHRCosts { get; set; } = new List<UserAreaHRCost>();
}
