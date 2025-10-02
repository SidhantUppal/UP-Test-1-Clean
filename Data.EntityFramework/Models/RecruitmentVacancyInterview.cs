using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RecruitmentVacancyInterview", Schema = "V7")]
public partial class RecruitmentVacancyInterview
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

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("RecruitmentVacancyInterviewArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("RecruitmentVacancyInterviewCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("RecruitmentVacancyInterviewModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("RecruitmentVacancyApplicantID")]
    [InverseProperty("RecruitmentVacancyInterviews")]
    public virtual RecruitmentVacancyApplicant RecruitmentVacancyApplicant { get; set; } = null!;
}
