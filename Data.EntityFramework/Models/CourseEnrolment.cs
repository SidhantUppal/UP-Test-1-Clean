using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CourseEnrolment", Schema = "V7")]
[Index("CompletionDate", Name = "IX_CourseEnrolment_CompletionDate")]
[Index("CourseID", Name = "IX_CourseEnrolment_CourseID")]
[Index("EnrolmentDate", Name = "IX_CourseEnrolment_EnrolmentDate")]
[Index("UserAreaID", Name = "IX_CourseEnrolment_UserAreaID")]
[Index("UserID", Name = "IX_CourseEnrolment_UserID")]
[Index("CourseID", "UserID", "ArchivedDate", Name = "UQ_CourseEnrolment_User", IsUnique = true)]
public partial class CourseEnrolment
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

    [Column(TypeName = "decimal(5, 2)")]
    public decimal? CurrentScore { get; set; }

    [Column(TypeName = "decimal(5, 2)")]
    public decimal? BestScore { get; set; }

    public int? AttemptCount { get; set; }

    public int? TotalTimeMinutes { get; set; }

    [Column(TypeName = "decimal(5, 2)")]
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

    [ForeignKey("CourseID")]
    [InverseProperty("CourseEnrolments")]
    public virtual Course Course { get; set; } = null!;

    [InverseProperty("CourseEnrolment")]
    public virtual ICollection<CourseCertificate> CourseCertificates { get; set; } = new List<CourseCertificate>();

    [InverseProperty("CourseEnrolment")]
    public virtual ICollection<CourseEnrolmentQuestionnaire> CourseEnrolmentQuestionnaires { get; set; } = new List<CourseEnrolmentQuestionnaire>();

    [InverseProperty("CourseEnrolment")]
    public virtual ICollection<CourseEnrolmentSCORMActivity> CourseEnrolmentSCORMActivities { get; set; } = new List<CourseEnrolmentSCORMActivity>();

    [InverseProperty("CourseEnrolment")]
    public virtual ICollection<CourseEnrolmentSignature> CourseEnrolmentSignatures { get; set; } = new List<CourseEnrolmentSignature>();

    [ForeignKey("EnrolmentStatusID")]
    [InverseProperty("CourseEnrolments")]
    public virtual CourseEnrolmentStatusType EnrolmentStatus { get; set; } = null!;

    [InverseProperty("CourseEnrolment")]
    public virtual ICollection<QuestionnaireResponse> QuestionnaireResponses { get; set; } = new List<QuestionnaireResponse>();

    [ForeignKey("UserID")]
    [InverseProperty("CourseEnrolments")]
    public virtual User User { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("CourseEnrolments")]
    public virtual UserArea UserArea { get; set; } = null!;
}
