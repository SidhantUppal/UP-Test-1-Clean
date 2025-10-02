using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HazardCategoryType", Schema = "V7")]
public partial class HazardCategoryType
{
    [Key]
    public int HazardCategoryTypeID { get; set; }

    public int? ParentCategoryID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(100)]
    public string Title { get; set; } = null!;

    [StringLength(500)]
    public string? Description { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("HazardCategoryTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("HazardCategoryTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("HazardCategoryType")]
    public virtual ICollection<Hazard> Hazards { get; set; } = new List<Hazard>();

    [InverseProperty("ParentCategory")]
    public virtual ICollection<HazardCategoryType> InverseParentCategory { get; set; } = new List<HazardCategoryType>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("HazardCategoryTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("ParentCategoryID")]
    [InverseProperty("InverseParentCategory")]
    public virtual HazardCategoryType? ParentCategory { get; set; }

    [InverseProperty("HazardCategoryType")]
    public virtual ICollection<RiskAssessmentHazardCategoryType> RiskAssessmentHazardCategoryTypes { get; set; } = new List<RiskAssessmentHazardCategoryType>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("HazardCategoryTypes")]
    public virtual UserArea? UserArea { get; set; }
}
