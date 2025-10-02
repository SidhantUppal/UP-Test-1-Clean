using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class tblAssessmentDiaryViewModel
{
    [Key]
    public int DiaryId { get; set; }

    public int PortfolioId { get; set; }

    public int? LogTypeId { get; set; }

    public DateTimeOffset ActivityDate { get; set; }

    public string? ActivityDescription { get; set; }

    public int? Duration { get; set; }

    public int? AssessorId { get; set; }

    public int? LearnerId { get; set; }

    [StringLength(500)]
    public string? UnitsAssessed { get; set; }

    [StringLength(200)]
    public string? Location { get; set; }

    public string? NextActionRequired { get; set; }

    public DateTimeOffset? NextActionDate { get; set; }

    public int? CreatedBy { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public int? ModifiedBy { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    // Additional Properties
}
