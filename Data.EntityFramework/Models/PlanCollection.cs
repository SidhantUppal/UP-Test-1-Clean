using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("PlanCollection", Schema = "V7")]
public partial class PlanCollection
{
    [Key]
    public int PlanCollectionID { get; set; }

    public int PlanCollectionTypeID { get; set; }

    public int Priority { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public int? ArchivedByUserID { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Comments { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("PlanCollectionArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("PlanCollectionCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("PlanCollectionModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("PlanCollection")]
    public virtual ICollection<PlanCollectionItem> PlanCollectionItems { get; set; } = new List<PlanCollectionItem>();

    [ForeignKey("PlanCollectionTypeID")]
    [InverseProperty("PlanCollections")]
    public virtual PlanCollectionType PlanCollectionType { get; set; } = null!;
}
