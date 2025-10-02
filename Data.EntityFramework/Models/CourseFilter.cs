using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CourseFilter", Schema = "V7")]
public partial class CourseFilter
{
    [Key]
    public int CourseFilterID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(100)]
    public string FilterName { get; set; } = null!;

    [StringLength(50)]
    public string FilterType { get; set; } = null!;

    [StringLength(255)]
    public string FilterValue { get; set; } = null!;

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("CourseFilters")]
    public virtual UserArea UserArea { get; set; } = null!;
}
