using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RecruitmentVacancy", Schema = "V7")]
public partial class RecruitmentVacancy
{
    [Key]
    public int RecruitmentVacancyID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(20)]
    public string Reference { get; set; } = null!;

    [StringLength(255)]
    public string JobTitle { get; set; } = null!;

    [StringLength(255)]
    public string? ManagerDetails { get; set; }

    [StringLength(255)]
    public string? DepartmentDetails { get; set; }

    public string? OtherDetails { get; set; }

    public DateTimeOffset? SuggestedStartDate { get; set; }

    public DateTimeOffset? VacancyOpeningDate { get; set; }

    public DateTimeOffset? VacancyClosingDate { get; set; }

    public byte TotalVacancies { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("RecruitmentVacancyArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("RecruitmentVacancyCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("RecruitmentVacancyModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("RecruitmentVacancy")]
    public virtual ICollection<RecruitmentTypeVacancy> RecruitmentTypeVacancies { get; set; } = new List<RecruitmentTypeVacancy>();

    [InverseProperty("RecruitmentVacancy")]
    public virtual ICollection<RecruitmentVacancyApplicant> RecruitmentVacancyApplicants { get; set; } = new List<RecruitmentVacancyApplicant>();

    [InverseProperty("RecruitmentVacancy")]
    public virtual ICollection<RecruitmentVacancyAttachment> RecruitmentVacancyAttachments { get; set; } = new List<RecruitmentVacancyAttachment>();

    [InverseProperty("RecruitmentVacancy")]
    public virtual ICollection<RecruitmentVacancyInfoItem> RecruitmentVacancyInfoItems { get; set; } = new List<RecruitmentVacancyInfoItem>();

    [InverseProperty("RecruitmentVacancy")]
    public virtual ICollection<RecruitmentVacancyTagType> RecruitmentVacancyTagTypes { get; set; } = new List<RecruitmentVacancyTagType>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("RecruitmentVacancies")]
    public virtual UserArea UserArea { get; set; } = null!;
}
