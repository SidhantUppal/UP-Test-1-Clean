using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RecruitmentVacancyAttachmentTypeViewModel
{
    [Key]
    public int RecruitmentVacancyAttachmentTypeID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    // Additional Properties
}
