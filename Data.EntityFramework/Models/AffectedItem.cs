using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AffectedItem", Schema = "V7")]
public partial class AffectedItem
{
    [Key]
    public int AffectedItemID { get; set; }

    public int AffectedItemTypeID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(20)]
    public string? Reference { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public int? ArchivedByUserID { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("AffectedItemTypeID")]
    [InverseProperty("AffectedItems")]
    public virtual AffectedItemType AffectedItemType { get; set; } = null!;

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("AffectedItemArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("AffectedItemCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("AffectedItemModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("AffectedItem")]
    public virtual ICollection<RiskAssessmentAffectedItem> RiskAssessmentAffectedItems { get; set; } = new List<RiskAssessmentAffectedItem>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("AffectedItems")]
    public virtual UserArea UserArea { get; set; } = null!;
}
