using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RecruitmentVacancyTagTypeViewModel
{
    [Key]
    public int RecruitmentVacancyTagTypeID { get; set; }

    public int RecruitmentVacancyID { get; set; }

    public int TagTypeID { get; set; }

    // Additional Properties
}
