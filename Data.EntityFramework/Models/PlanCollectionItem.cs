using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("PlanCollectionItem", Schema = "V7")]
public partial class PlanCollectionItem
{
    [Key]
    public int PlanCollectionItemID { get; set; }

    public int PlanCollectionID { get; set; }

    public int AlertTypeID { get; set; }

    public int? DocumentLinkTableTypeID { get; set; }

    public int? ItemID { get; set; }

    public int OrderNum { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("PlanCollectionItem")]
    public virtual ICollection<ActionPlanItem> ActionPlanItems { get; set; } = new List<ActionPlanItem>();

    [ForeignKey("AlertTypeID")]
    [InverseProperty("PlanCollectionItems")]
    public virtual AlertType AlertType { get; set; } = null!;

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("PlanCollectionItemArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("PlanCollectionItemCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("DocumentLinkTableTypeID")]
    [InverseProperty("PlanCollectionItems")]
    public virtual DocumentLinkTableType? DocumentLinkTableType { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("PlanCollectionItemModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("PlanCollectionID")]
    [InverseProperty("PlanCollectionItems")]
    public virtual PlanCollection PlanCollection { get; set; } = null!;
}
