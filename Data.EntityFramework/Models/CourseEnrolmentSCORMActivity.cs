using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CourseEnrolmentSCORMActivity", Schema = "V7")]
public partial class CourseEnrolmentSCORMActivity
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

    [Column(TypeName = "decimal(5, 2)")]
    public decimal? ProgressMeasure { get; set; }

    [Column(TypeName = "decimal(10, 2)")]
    public decimal? ScoreRaw { get; set; }

    [Column(TypeName = "decimal(10, 2)")]
    public decimal? ScoreMin { get; set; }

    [Column(TypeName = "decimal(10, 2)")]
    public decimal? ScoreMax { get; set; }

    [Column(TypeName = "decimal(5, 2)")]
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

    [ForeignKey("CourseEnrolmentID")]
    [InverseProperty("CourseEnrolmentSCORMActivities")]
    public virtual CourseEnrolment CourseEnrolment { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("CourseEnrolmentSCORMActivities")]
    public virtual UserArea UserArea { get; set; } = null!;
}
