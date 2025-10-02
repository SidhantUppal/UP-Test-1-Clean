using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CourseEnrolmentStatusType", Schema = "V7")]
public partial class CourseEnrolmentStatusType
{
    [Key]
    public int CourseEnrolmentStatusTypeID { get; set; }

    [StringLength(50)]
    public string StatusName { get; set; } = null!;

    [StringLength(200)]
    public string? StatusDescription { get; set; }

    [StringLength(7)]
    public string? ColorCode { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [InverseProperty("CourseEnrolmentStatusType")]
    public virtual ICollection<CourseEnrollment> CourseEnrollments { get; set; } = new List<CourseEnrollment>();

    [InverseProperty("EnrolmentStatus")]
    public virtual ICollection<CourseEnrolment> CourseEnrolments { get; set; } = new List<CourseEnrolment>();
}
