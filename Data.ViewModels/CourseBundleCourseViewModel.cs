using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class CourseBundleCourseViewModel
{
    [Key]
    public int CourseBundleCourseID { get; set; }

    public int CourseBundleID { get; set; }

    public int CourseID { get; set; }

    public int? SequenceOrder { get; set; }

    public bool? IsMandatory { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
