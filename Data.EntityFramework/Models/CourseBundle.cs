using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CourseBundle", Schema = "V7")]
public partial class CourseBundle
{
    [Key]
    public int CourseBundleID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(255)]
    public string BundleName { get; set; } = null!;

    public string? BundleDescription { get; set; }

    public int? TotalDurationMinutes { get; set; }

    [Column(TypeName = "decimal(10, 2)")]
    public decimal? TotalCost { get; set; }

    [Column(TypeName = "decimal(5, 2)")]
    public decimal? DiscountPercentage { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("CourseBundle")]
    public virtual ICollection<CourseBundleCourse> CourseBundleCourses { get; set; } = new List<CourseBundleCourse>();

    [InverseProperty("CourseBundle")]
    public virtual ICollection<CourseBundleFilter> CourseBundleFilters { get; set; } = new List<CourseBundleFilter>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("CourseBundles")]
    public virtual UserArea UserArea { get; set; } = null!;
}
