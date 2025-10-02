using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("InductionBundle", Schema = "V7")]
public partial class InductionBundle
{
    [Key]
    public int InductionBundleID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(150)]
    public string Title { get; set; } = null!;

    public int EmployeeTypeID { get; set; }

    public bool IsPublished { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("InductionBundleArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("InductionBundleCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmployeeTypeID")]
    [InverseProperty("InductionBundles")]
    public virtual EmployeeType EmployeeType { get; set; } = null!;

    [InverseProperty("InductionBundle")]
    public virtual ICollection<InductionAllocation> InductionAllocations { get; set; } = new List<InductionAllocation>();

    [InverseProperty("InductionBundle")]
    public virtual ICollection<InductionBundleItem> InductionBundleItems { get; set; } = new List<InductionBundleItem>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("InductionBundleModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("InductionBundles")]
    public virtual UserArea UserArea { get; set; } = null!;
}
