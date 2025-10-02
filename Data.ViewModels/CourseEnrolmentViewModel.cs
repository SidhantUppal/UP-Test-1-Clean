using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class CourseEnrolmentViewModel
{
    [Key]
    public int CourseEnrolmentID { get; set; }

    public int UserAreaID { get; set; }

    public int CourseID { get; set; }

    public int UserID { get; set; }

    public DateTimeOffset EnrolmentDate { get; set; }

    [StringLength(50)]
    public string? EnrolmentType { get; set; }

    public int EnrolmentStatusID { get; set; }

    public DateTimeOffset? StartDate { get; set; }

    public DateTimeOffset? LastAccessDate { get; set; }

    public DateTimeOffset? CompletionDate { get; set; }

    public DateTimeOffset? ExpiryDate { get; set; }

    public decimal? CurrentScore { get; set; }

    public decimal? BestScore { get; set; }

    public int? AttemptCount { get; set; }

    public int? TotalTimeMinutes { get; set; }

    public decimal? ProgressPercentage { get; set; }

    [StringLength(50)]
    public string? CertificateNumber { get; set; }

    public DateTimeOffset? CertificateIssuedDate { get; set; }

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
