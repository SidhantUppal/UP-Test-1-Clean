using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RecruitmentVacancyTagType", Schema = "V7")]
[Index("RecruitmentVacancyID", "TagTypeID", Name = "CK_RecruitmentVacancyTagType_Unique", IsUnique = true)]
[Index("RecruitmentVacancyID", Name = "IX_RecruitmentVacancyTagType_RecruitmentVacancy_includes")]
[Index("TagTypeID", Name = "IX_RecruitmentVacancyTagType_TagType_includes")]
public partial class RecruitmentVacancyTagType
{
    [Key]
    public int RecruitmentVacancyTagTypeID { get; set; }

    public int RecruitmentVacancyID { get; set; }

    public int TagTypeID { get; set; }

    [ForeignKey("RecruitmentVacancyID")]
    [InverseProperty("RecruitmentVacancyTagTypes")]
    public virtual RecruitmentVacancy RecruitmentVacancy { get; set; } = null!;

    [ForeignKey("TagTypeID")]
    [InverseProperty("RecruitmentVacancyTagTypes")]
    public virtual TagType TagType { get; set; } = null!;
}
