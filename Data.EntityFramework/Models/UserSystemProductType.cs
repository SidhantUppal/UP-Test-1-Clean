using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserSystemProductType", Schema = "V7")]
[Index("UserID", "UserAreaID", "SystemProductTypeID", Name = "IX_UserSystemProductType_IsEnabled")]
public partial class UserSystemProductType
{
    [Key]
    public int UserSystemProductTypeID { get; set; }

    public int UserID { get; set; }

    public int UserAreaID { get; set; }

    public int SystemProductTypeID { get; set; }

    public bool IsEnabled { get; set; }

    [ForeignKey("SystemProductTypeID")]
    [InverseProperty("UserSystemProductTypes")]
    public virtual SystemProductType SystemProductType { get; set; } = null!;

    [ForeignKey("UserID")]
    [InverseProperty("UserSystemProductTypes")]
    public virtual User User { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserSystemProductTypes")]
    public virtual UserArea UserArea { get; set; } = null!;
}
