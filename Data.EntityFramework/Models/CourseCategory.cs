using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CourseCategory", Schema = "V7")]
public partial class CourseCategory
{
    [Key]
    public int CourseCategoryID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(100)]
    public string CategoryName { get; set; } = null!;

    [StringLength(500)]
    public string? CategoryDescription { get; set; }

    public int? ParentCategoryID { get; set; }

    public int? DisplayOrder { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("CourseCategory")]
    public virtual ICollection<Course> Courses { get; set; } = new List<Course>();

    [InverseProperty("ParentCategory")]
    public virtual ICollection<CourseCategory> InverseParentCategory { get; set; } = new List<CourseCategory>();

    [ForeignKey("ParentCategoryID")]
    [InverseProperty("InverseParentCategory")]
    public virtual CourseCategory? ParentCategory { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("CourseCategories")]
    public virtual UserArea UserArea { get; set; } = null!;
}
