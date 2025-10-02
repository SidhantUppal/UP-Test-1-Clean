using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HighLevelProductType", Schema = "V7")]
public partial class HighLevelProductType
{
    [Key]
    public int HighLevelProductTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(50)]
    public string? Controller { get; set; }

    [StringLength(50)]
    public string? Action { get; set; }

    [StringLength(500)]
    public string? ResourceStringKey { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public int? ArchivedByUserID { get; set; }

    public bool IsSelectable { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("HighLevelProductType")]
    public virtual ICollection<LicenceHighLevelProductType> LicenceHighLevelProductTypes { get; set; } = new List<LicenceHighLevelProductType>();

    [InverseProperty("HighLevelProductType")]
    public virtual ICollection<ProductTypeHighLevelProductType> ProductTypeHighLevelProductTypes { get; set; } = new List<ProductTypeHighLevelProductType>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("HighLevelProductTypes")]
    public virtual UserArea? UserArea { get; set; }
}
