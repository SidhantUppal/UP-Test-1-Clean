using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CurrencyType", Schema = "V7")]
public partial class CurrencyType
{
    [Key]
    public int CurrencyTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(20)]
    public string Symbol { get; set; } = null!;

    [StringLength(50)]
    public string? Title { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("CurrencyTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("CurrencyType")]
    public virtual ICollection<CostSheet> CostSheets { get; set; } = new List<CostSheet>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("CurrencyTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("CurrencyTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("CurrencyTypes")]
    public virtual UserArea? UserArea { get; set; }
}
