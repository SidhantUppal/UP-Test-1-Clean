using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ApplicationStatusType", Schema = "V7")]
public partial class ApplicationStatusType
{
    [Key]
    public int ApplicationStatusTypeID { get; set; }

    [StringLength(50)]
    public string Reference { get; set; } = null!;

    [StringLength(255)]
    public string? Title { get; set; }

    [InverseProperty("ApplicationStatusType")]
    public virtual ICollection<RecruitmentVacancyApplicant> RecruitmentVacancyApplicants { get; set; } = new List<RecruitmentVacancyApplicant>();
}
