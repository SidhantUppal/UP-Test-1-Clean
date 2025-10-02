using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CourseType", Schema = "V7")]
public partial class CourseType
{
    [Key]
    public int CourseTypeID { get; set; }

    [StringLength(50)]
    public string TypeName { get; set; } = null!;

    [StringLength(200)]
    public string? TypeDescription { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("CourseType")]
    public virtual ICollection<Course> Courses { get; set; } = new List<Course>();
}
