using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RecruitmentTypeVacancy", Schema = "V7")]
[Index("RecruitmentTypeID", "RecruitmentVacancyID", Name = "CK_RecruitmentTypeVacancy_Unique", IsUnique = true)]
[Index("RecruitmentVacancyID", Name = "IX_RecruitmentTypeVacancy_RecruitmentVacancyID_includes")]
public partial class RecruitmentTypeVacancy
{
    [Key]
    public int RecruitmentTypeVacancyID { get; set; }

    public int RecruitmentTypeID { get; set; }

    public int RecruitmentVacancyID { get; set; }

    [ForeignKey("RecruitmentTypeID")]
    [InverseProperty("RecruitmentTypeVacancies")]
    public virtual RecruitmentType RecruitmentType { get; set; } = null!;

    [ForeignKey("RecruitmentVacancyID")]
    [InverseProperty("RecruitmentTypeVacancies")]
    public virtual RecruitmentVacancy RecruitmentVacancy { get; set; } = null!;
}
