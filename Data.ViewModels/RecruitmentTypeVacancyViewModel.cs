using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RecruitmentTypeVacancyViewModel
{
    [Key]
    public int RecruitmentTypeVacancyID { get; set; }

    public int RecruitmentTypeID { get; set; }

    public int RecruitmentVacancyID { get; set; }

    // Additional Properties
}
