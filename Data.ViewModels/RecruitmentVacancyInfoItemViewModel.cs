using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RecruitmentVacancyInfoItemViewModel
{
    [Key]
    public int RecruitmentVacancyInfoItemID { get; set; }

    public int RecruitmentVacancyID { get; set; }

    [StringLength(100)]
    public string Title { get; set; } = null!;

    public string Details { get; set; } = null!;

    // Additional Properties
}
