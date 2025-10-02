using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RecruitmentVacancyAttachmentViewModel
{
    [Key]
    public int RecruitmentVacancyAttachmentID { get; set; }

    public int RecruitmentVacancyAttachmentTypeID { get; set; }

    public int AttachmentID { get; set; }

    public int? RecruitmentVacancyID { get; set; }

    public int? RecruitmentVacancyApplicantID { get; set; }

    public int? ContactID { get; set; }

    // Additional Properties
}
