using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class CourseEnrollmentViewModel
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

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
