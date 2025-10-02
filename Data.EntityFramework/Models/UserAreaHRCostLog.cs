using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaHRCostLog", Schema = "V7")]
public partial class UserAreaHRCostLog
{
    [Key]
    public int UserAreaHRCostLogID { get; set; }

    public int UserAreaID { get; set; }

    [Column(TypeName = "decimal(8, 2)")]
    public decimal BaseRateAnnualCostGBP { get; set; }

    [Column(TypeName = "decimal(8, 2)")]
    public decimal UserRateAnnualCostGBP { get; set; }

    public int TotalPurchasedEmployees { get; set; }

    public int TotalActualEmployees { get; set; }

    public int TotalPurchasedUsers { get; set; }

    public int TotalActualUsers { get; set; }

    public byte ProductLevel { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("UserAreaHRCostLogs")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaHRCostLogs")]
    public virtual UserArea UserArea { get; set; } = null!;

    [InverseProperty("UserAreaHRCostLog")]
    public virtual ICollection<UserAreaHRCostTransaction> UserAreaHRCostTransactions { get; set; } = new List<UserAreaHRCostTransaction>();
}
