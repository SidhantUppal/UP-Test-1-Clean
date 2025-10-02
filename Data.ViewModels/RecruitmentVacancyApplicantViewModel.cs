using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RecruitmentVacancyApplicantViewModel
{
    [Key]
    public int RecruitmentVacancyApplicantID { get; set; }

    public int ContactID { get; set; }

    public int RecruitmentVacancyID { get; set; }

    public int ApplicationStatusTypeID { get; set; }

    public DateTimeOffset ApplicationDate { get; set; }

    // Additional Properties
}
