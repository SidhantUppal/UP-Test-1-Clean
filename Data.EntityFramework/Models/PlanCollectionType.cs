using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("PlanCollectionType", Schema = "V7")]
public partial class PlanCollectionType
{
    [Key]
    public int PlanCollectionTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(100)]
    public string Name { get; set; } = null!;

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("PlanCollectionTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("PlanCollectionTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("PlanCollectionTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("PlanCollectionType")]
    public virtual ICollection<PlanCollection> PlanCollections { get; set; } = new List<PlanCollection>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("PlanCollectionTypes")]
    public virtual UserArea? UserArea { get; set; }
}
