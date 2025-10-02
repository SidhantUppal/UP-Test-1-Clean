using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TextBlockCourse", Schema = "V7")]
public partial class TextBlockCourse
{
    [Key]
    public int TextBlockCourseID { get; set; }

    public int TextBlockID { get; set; }

    public int CourseID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("CourseID")]
    [InverseProperty("TextBlockCourses")]
    public virtual Course Course { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("TextBlockCourses")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("TextBlockID")]
    [InverseProperty("TextBlockCourses")]
    public virtual TextBlock TextBlock { get; set; } = null!;
}
