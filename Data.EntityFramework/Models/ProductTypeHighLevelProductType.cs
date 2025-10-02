using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ProductTypeHighLevelProductType", Schema = "V7")]
[Index("HighLevelProductTypeID", "ProductTypeID", Name = "IX_ProductTypeHighLevelProductType_ProductType")]
public partial class ProductTypeHighLevelProductType
{
    [Key]
    public int ProductTypeHighLevelProductTypeID { get; set; }

    public int HighLevelProductTypeID { get; set; }

    public int ProductTypeID { get; set; }

    [ForeignKey("HighLevelProductTypeID")]
    [InverseProperty("ProductTypeHighLevelProductTypes")]
    public virtual HighLevelProductType HighLevelProductType { get; set; } = null!;

    [ForeignKey("ProductTypeID")]
    [InverseProperty("ProductTypeHighLevelProductTypes")]
    public virtual ProductType ProductType { get; set; } = null!;
}
