using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class CourseViewModel
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

    public decimal? Cost { get; set; }

    [StringLength(3)]
    public string? Currency { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
