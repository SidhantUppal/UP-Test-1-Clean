using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaSystemProductType", Schema = "V7")]
[Index("UserAreaID", "SystemProductTypeID", Name = "IX_UserAreaSystemProductType_IsEnabled")]
public partial class UserAreaSystemProductType
{
    [Key]
    public int UserAreaSystemProductTypeID { get; set; }

    public int UserAreaID { get; set; }

    public int SystemProductTypeID { get; set; }

    public bool IsEnabled { get; set; }

    [ForeignKey("SystemProductTypeID")]
    [InverseProperty("UserAreaSystemProductTypes")]
    public virtual SystemProductType SystemProductType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaSystemProductTypes")]
    public virtual UserArea UserArea { get; set; } = null!;
}
