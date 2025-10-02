using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HRCostUserRate", Schema = "V7")]
public partial class HRCostUserRate
{
    [Key]
    public int HRCostUserRateID { get; set; }

    [Column(TypeName = "decimal(8, 2)")]
    public decimal Level1AnnualCostGBP { get; set; }

    [Column(TypeName = "decimal(8, 2)")]
    public decimal Level2AnnualCostGBP { get; set; }

    [Column(TypeName = "decimal(8, 2)")]
    public decimal Level3AnnualCostGBP { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("HRCostUserRates")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("HRCostUserRate")]
    public virtual ICollection<UserAreaHRCost> UserAreaHRCosts { get; set; } = new List<UserAreaHRCost>();
}
