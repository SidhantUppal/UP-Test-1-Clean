using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CourseEnrollment", Schema = "V7")]
[Index("CourseAssignmentID", Name = "IX_CourseEnrollment_CourseAssignmentID")]
[Index("CourseEnrolmentStatusTypeID", "ArchivedDate", "CompletionDate", Name = "IX_CourseEnrollment_CourseEnrolmentStatusTypeID_ArchivedDate_CompletionDate")]
public partial class CourseEnrollment
{
    [Key]
    public int CourseEnrollmentID { get; set; }

    public int? OriginalCourseEnrolmentID { get; set; }

    public int CourseAssignmentID { get; set; }

    public DateTimeOffset? IsLiveDate { get; set; }

    public DateTimeOffset? StartDate { get; set; }

    public DateTimeOffset? CompletionDate { get; set; }

    public int? CourseEnrolmentStatusTypeID { get; set; }

    public bool? Result { get; set; }

    public string? Note { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? AttachmentID { get; set; }

    public int? UserAreaID { get; set; }

    public int? AssessorEmployeeID { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("CourseEnrollmentArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("AssessorEmployeeID")]
    [InverseProperty("CourseEnrollments")]
    public virtual Employee? AssessorEmployee { get; set; }

    [ForeignKey("CourseAssignmentID")]
    [InverseProperty("CourseEnrollments")]
    public virtual CourseAssignment CourseAssignment { get; set; } = null!;

    [InverseProperty("CourseEnrollment")]
    public virtual ICollection<CourseEnrollmentQuestionnaire> CourseEnrollmentQuestionnaires { get; set; } = new List<CourseEnrollmentQuestionnaire>();

    [ForeignKey("CourseEnrolmentStatusTypeID")]
    [InverseProperty("CourseEnrollments")]
    public virtual CourseEnrolmentStatusType? CourseEnrolmentStatusType { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("CourseEnrollmentCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("CourseEnrollmentModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("CourseEnrollment")]
    public virtual ICollection<QuestionnaireResponse> QuestionnaireResponses { get; set; } = new List<QuestionnaireResponse>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("CourseEnrollments")]
    public virtual UserArea? UserArea { get; set; }
}
