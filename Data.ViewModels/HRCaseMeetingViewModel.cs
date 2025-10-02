using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HRCaseMeetingViewModel
{
    [Key]
    public int HRCaseMeetingID { get; set; }

    public int HRCaseID { get; set; }

    public int HRMeetingTypeID { get; set; }

    public int? HRCaseStatusTypeID { get; set; }

    public DateTimeOffset MeetingDate { get; set; }

    public short? Status { get; set; }

    [StringLength(255)]
    public string? Location { get; set; }

    public bool IsFirstInstance { get; set; }

    public bool IsComplete { get; set; }

    public bool IsAdjourned { get; set; }

    public bool IsEditEnabled { get; set; }

    public int? ManagerEmployeeID { get; set; }

    public string? EmployeeSignature { get; set; }

    public DateTimeOffset? EmployeeSignDate { get; set; }

    public string? ManagerSignature { get; set; }

    public DateTimeOffset? ManagerSignDate { get; set; }

    public DateTimeOffset? AddedToBundleDate { get; set; }

    public bool? HasProvidedSelfAssessment { get; set; }

    public int? SelfAssessmentQuestionnaireResponseID { get; set; }

    public int? SelfAssessmentAttachmentID { get; set; }

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
