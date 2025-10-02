using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ProductType", Schema = "V7")]
public partial class ProductType
{
    [Key]
    public int ProductTypeID { get; set; }

    [StringLength(50)]
    public string? Controller { get; set; }

    [StringLength(50)]
    public string? Action { get; set; }

    public string? Notes { get; set; }

    [StringLength(500)]
    public string? ResourceStringKey { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("ProductType")]
    public virtual ICollection<ProductTypeHighLevelProductType> ProductTypeHighLevelProductTypes { get; set; } = new List<ProductTypeHighLevelProductType>();

    [InverseProperty("ProductType")]
    public virtual ICollection<ProductTypeModuleType> ProductTypeModuleTypes { get; set; } = new List<ProductTypeModuleType>();
}
