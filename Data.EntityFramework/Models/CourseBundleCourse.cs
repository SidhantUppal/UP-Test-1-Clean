using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CourseBundleCourse", Schema = "V7")]
[Index("CourseBundleID", "CourseID", Name = "UQ_CourseBundleCourse", IsUnique = true)]
public partial class CourseBundleCourse
{
    [Key]
    public int CourseBundleCourseID { get; set; }

    public int CourseBundleID { get; set; }

    public int CourseID { get; set; }

    public int? SequenceOrder { get; set; }

    public bool? IsMandatory { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("CourseID")]
    [InverseProperty("CourseBundleCourses")]
    public virtual Course Course { get; set; } = null!;

    [ForeignKey("CourseBundleID")]
    [InverseProperty("CourseBundleCourses")]
    public virtual CourseBundle CourseBundle { get; set; } = null!;
}
