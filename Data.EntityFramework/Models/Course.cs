using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Course", Schema = "V7")]
[Index("CourseCode", Name = "IX_Course_CourseCode")]
[Index("Status", Name = "IX_Course_Status")]
[Index("UserAreaID", Name = "IX_Course_UserAreaID")]
public partial class Course
{
    [Key]
    public int CourseID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(50)]
    public string CourseCode { get; set; } = null!;

    [StringLength(255)]
    public string CourseName { get; set; } = null!;

    public string? CourseDescription { get; set; }

    public int? CourseTypeID { get; set; }

    public int? CourseCategoryID { get; set; }

    public int? DurationMinutes { get; set; }

    [Column(TypeName = "decimal(5, 2)")]
    public decimal? PassingScore { get; set; }

    public int? MaxAttempts { get; set; }

    public int? ValidityDays { get; set; }

    [StringLength(50)]
    public string? ContentType { get; set; }

    [StringLength(500)]
    public string? ContentURL { get; set; }

    [StringLength(500)]
    public string? ThumbnailURL { get; set; }

    [StringLength(50)]
    public string? Status { get; set; }

    public DateTimeOffset? PublishedDate { get; set; }

    public bool? IsActive { get; set; }

    public bool? IsMandatory { get; set; }

    [Column(TypeName = "decimal(10, 2)")]
    public decimal? Cost { get; set; }

    [StringLength(3)]
    public string? Currency { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("Course")]
    public virtual ICollection<CourseAllocation> CourseAllocations { get; set; } = new List<CourseAllocation>();

    [InverseProperty("Course")]
    public virtual ICollection<CourseAssignment> CourseAssignments { get; set; } = new List<CourseAssignment>();

    [InverseProperty("Course")]
    public virtual ICollection<CourseAttachment> CourseAttachments { get; set; } = new List<CourseAttachment>();

    [InverseProperty("Course")]
    public virtual ICollection<CourseBundleCourse> CourseBundleCourses { get; set; } = new List<CourseBundleCourse>();

    [ForeignKey("CourseCategoryID")]
    [InverseProperty("Courses")]
    public virtual CourseCategory? CourseCategory { get; set; }

    [InverseProperty("Course")]
    public virtual ICollection<CourseEnrolment> CourseEnrolments { get; set; } = new List<CourseEnrolment>();

    [InverseProperty("Course")]
    public virtual ICollection<CourseQuestionaire> CourseQuestionaires { get; set; } = new List<CourseQuestionaire>();

    [ForeignKey("CourseTypeID")]
    [InverseProperty("Courses")]
    public virtual CourseType? CourseType { get; set; }

    [InverseProperty("Course")]
    public virtual ICollection<EmployeeAttachment> EmployeeAttachments { get; set; } = new List<EmployeeAttachment>();

    [InverseProperty("Course")]
    public virtual ICollection<ExposureTypeTraining> ExposureTypeTrainings { get; set; } = new List<ExposureTypeTraining>();

    [InverseProperty("TrainingCourse")]
    public virtual ICollection<Policy> Policies { get; set; } = new List<Policy>();

    [InverseProperty("Course")]
    public virtual ICollection<TextBlockCourse> TextBlockCourses { get; set; } = new List<TextBlockCourse>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("Courses")]
    public virtual UserArea UserArea { get; set; } = null!;
}
