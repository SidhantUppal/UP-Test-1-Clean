using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ActionPlan", Schema = "V7")]
public partial class ActionPlan
{
    [Key]
    public int ActionPlanID { get; set; }

    public int UserAreaID { get; set; }

    public int? OrgGroupID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("ActionPlan")]
    public virtual ICollection<ActionPlanItem> ActionPlanItems { get; set; } = new List<ActionPlanItem>();

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ActionPlanArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ActionPlanCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ActionPlanModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("OrgGroupID")]
    [InverseProperty("ActionPlans")]
    public virtual OrgGroup? OrgGroup { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("ActionPlans")]
    public virtual UserArea UserArea { get; set; } = null!;
}
