using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaCostType", Schema = "V7")]
[Index("UserAreaID", "CostTypeID", Name = "CK_UserAreaCostType_UserAreaCostType", IsUnique = true)]
public partial class UserAreaCostType
{
    [Key]
    public int UserAreaCostTypeID { get; set; }

    public int UserAreaID { get; set; }

    public int CostTypeID { get; set; }

    public bool IsVisible { get; set; }

    [ForeignKey("CostTypeID")]
    [InverseProperty("UserAreaCostTypes")]
    public virtual CostType CostType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaCostTypes")]
    public virtual UserArea UserArea { get; set; } = null!;
}
