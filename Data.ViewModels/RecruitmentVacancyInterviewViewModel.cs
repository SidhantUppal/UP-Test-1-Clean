using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RecruitmentVacancyInterviewViewModel
{
    [Key]
    public int RecruitmentVacancyInterviewID { get; set; }

    public int RecruitmentVacancyApplicantID { get; set; }

    public DateTimeOffset InterviewDateTime { get; set; }

    public string? InvitationText { get; set; }

    public string? InterviewNotes { get; set; }

    public bool? HasAttended { get; set; }

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
