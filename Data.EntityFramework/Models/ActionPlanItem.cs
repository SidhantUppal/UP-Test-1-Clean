using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ActionPlanItem", Schema = "V7")]
public partial class ActionPlanItem
{
    [Key]
    public int ActionPlanItemID { get; set; }

    public int ActionPlanID { get; set; }

    public int PlanCollectionItemID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? CompletedByUserID { get; set; }

    public DateTimeOffset? CompletedDate { get; set; }

    [ForeignKey("ActionPlanID")]
    [InverseProperty("ActionPlanItems")]
    public virtual ActionPlan ActionPlan { get; set; } = null!;

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ActionPlanItemArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CompletedByUserID")]
    [InverseProperty("ActionPlanItemCompletedByUsers")]
    public virtual User? CompletedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ActionPlanItemCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ActionPlanItemModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("PlanCollectionItemID")]
    [InverseProperty("ActionPlanItems")]
    public virtual PlanCollectionItem PlanCollectionItem { get; set; } = null!;
}
