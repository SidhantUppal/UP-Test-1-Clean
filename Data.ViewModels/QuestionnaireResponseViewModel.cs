using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class QuestionnaireResponseViewModel
{
    [Key]
    public int QuestionnaireResponseID { get; set; }

    public int? OriginalQuestionnaireResponseID { get; set; }

    public int QuestionnaireID { get; set; }

    public bool IsFinished { get; set; }

    [StringLength(100)]
    public string? Reference { get; set; }

    public int? CurrentQuestionnaireSectionID { get; set; }

    public int? TotalScore { get; set; }

    public int? MaxScore { get; set; }

    public int? CourseEnrollmentID { get; set; }

    public int? ChecklistEnrolmentID { get; set; }

    public int? AccidentCaseID { get; set; }

    public int? AccidentFormTypeID { get; set; }

    public int? EmployeeID { get; set; }

    public int? LocationID { get; set; }

    public DateTimeOffset? CompletedDate { get; set; }

    public int UserAreaID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public bool HasFailedCriticalQuestion { get; set; }

    public int MajorNonConformityCount { get; set; }

    public int MinorNonConformityCount { get; set; }

    public int CompliantCount { get; set; }

    public int? CourseEnrolmentID { get; set; }

    public bool IsSignOff { get; set; }

    public int? OrgGroupID { get; set; }

    public bool IsSignedOff { get; set; }

    [StringLength(2)]
    public string? CompletedTimeframe { get; set; }

    public bool IsAnonymousSubmission { get; set; }

    public bool IsApprovedSubmission { get; set; }

    [StringLength(255)]
    public string? ManagerEmployeeEmail { get; set; }

    [StringLength(20)]
    public string? PortalAccessToken { get; set; }

    public int? InductionEnrolmentID { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
