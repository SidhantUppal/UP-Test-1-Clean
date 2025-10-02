using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CostUnitType", Schema = "V7")]
public partial class CostUnitType
{
    [Key]
    public int CostUnitTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(20)]
    public string Reference { get; set; } = null!;

    [StringLength(50)]
    public string? Title { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("CostUnitTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("CostUnitType")]
    public virtual ICollection<CostType> CostTypes { get; set; } = new List<CostType>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("CostUnitTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("CostUnitTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("CostUnitTypes")]
    public virtual UserArea? UserArea { get; set; }
}
