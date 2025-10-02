using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RecruitmentVacancyInfoItem", Schema = "V7")]
public partial class RecruitmentVacancyInfoItem
{
    [Key]
    public int RecruitmentVacancyInfoItemID { get; set; }

    public int RecruitmentVacancyID { get; set; }

    [StringLength(100)]
    public string Title { get; set; } = null!;

    public string Details { get; set; } = null!;

    [ForeignKey("RecruitmentVacancyID")]
    [InverseProperty("RecruitmentVacancyInfoItems")]
    public virtual RecruitmentVacancy RecruitmentVacancy { get; set; } = null!;
}
