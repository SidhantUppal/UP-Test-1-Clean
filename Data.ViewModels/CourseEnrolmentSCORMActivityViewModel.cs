using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class CourseEnrolmentSCORMActivityViewModel
{
    [Key]
    public int CourseEnrolmentSCORMActivityID { get; set; }

    public int UserAreaID { get; set; }

    public int CourseEnrolmentID { get; set; }

    [StringLength(255)]
    public string ActivityID { get; set; } = null!;

    [StringLength(500)]
    public string? ActivityTitle { get; set; }

    [StringLength(50)]
    public string? CompletionStatus { get; set; }

    [StringLength(50)]
    public string? SuccessStatus { get; set; }

    public decimal? ProgressMeasure { get; set; }

    public decimal? ScoreRaw { get; set; }

    public decimal? ScoreMin { get; set; }

    public decimal? ScoreMax { get; set; }

    public decimal? ScoreScaled { get; set; }

    [StringLength(50)]
    public string? TotalTime { get; set; }

    [StringLength(50)]
    public string? SessionTime { get; set; }

    [StringLength(500)]
    public string? Location { get; set; }

    public string? SuspendData { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
}
