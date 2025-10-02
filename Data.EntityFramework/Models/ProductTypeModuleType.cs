using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ProductTypeModuleType", Schema = "V7")]
[Index("ProductTypeID", "ModuleTypeID", Name = "CK_ProductTypeModuleType_Unique", IsUnique = true)]
[Index("ProductTypeID", "ModuleTypeID", Name = "IX_ProductTypeModuleType_ProductTypeModuleType")]
public partial class ProductTypeModuleType
{
    [Key]
    public int ProductTypeModuleTypeID { get; set; }

    public int ProductTypeID { get; set; }

    public int ModuleTypeID { get; set; }

    [ForeignKey("ModuleTypeID")]
    [InverseProperty("ProductTypeModuleTypes")]
    public virtual ModuleType ModuleType { get; set; } = null!;

    [ForeignKey("ProductTypeID")]
    [InverseProperty("ProductTypeModuleTypes")]
    public virtual ProductType ProductType { get; set; } = null!;
}
