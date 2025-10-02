using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RecruitmentVacancyApplicant", Schema = "V7")]
public partial class RecruitmentVacancyApplicant
{
    [Key]
    public int RecruitmentVacancyApplicantID { get; set; }

    public int ContactID { get; set; }

    public int RecruitmentVacancyID { get; set; }

    public int ApplicationStatusTypeID { get; set; }

    public DateTimeOffset ApplicationDate { get; set; }

    [ForeignKey("ApplicationStatusTypeID")]
    [InverseProperty("RecruitmentVacancyApplicants")]
    public virtual ApplicationStatusType ApplicationStatusType { get; set; } = null!;

    [ForeignKey("ContactID")]
    [InverseProperty("RecruitmentVacancyApplicants")]
    public virtual Contact Contact { get; set; } = null!;

    [ForeignKey("RecruitmentVacancyID")]
    [InverseProperty("RecruitmentVacancyApplicants")]
    public virtual RecruitmentVacancy RecruitmentVacancy { get; set; } = null!;

    [InverseProperty("RecruitmentVacancyApplicant")]
    public virtual ICollection<RecruitmentVacancyAttachment> RecruitmentVacancyAttachments { get; set; } = new List<RecruitmentVacancyAttachment>();

    [InverseProperty("RecruitmentVacancyApplicant")]
    public virtual ICollection<RecruitmentVacancyInterview> RecruitmentVacancyInterviews { get; set; } = new List<RecruitmentVacancyInterview>();
}
