using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaHRCost", Schema = "V7")]
[Index("UserAreaID", Name = "CK_UserAreaHRCost_UserArea", IsUnique = true)]
public partial class UserAreaHRCost
{
    [Key]
    public int UserAreaHRCostID { get; set; }

    public int UserAreaID { get; set; }

    public int HRCostBaseRateID { get; set; }

    public int HRCostUserRateID { get; set; }

    public int TotalPurchasedEmployees { get; set; }

    public int TotalPurchasedUsers { get; set; }

    public byte ProductLevel { get; set; }

    public string? Comments { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("UserAreaHRCostCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("HRCostBaseRateID")]
    [InverseProperty("UserAreaHRCosts")]
    public virtual HRCostBaseRate HRCostBaseRate { get; set; } = null!;

    [ForeignKey("HRCostUserRateID")]
    [InverseProperty("UserAreaHRCosts")]
    public virtual HRCostUserRate HRCostUserRate { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("UserAreaHRCostModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaHRCost")]
    public virtual UserArea UserArea { get; set; } = null!;
}
