using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RecruitmentVacancyViewModel
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

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
