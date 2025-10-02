using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class tblPortfolioViewModel
{
    [Key]
    public int PortfolioId { get; set; }

    public int LearnerId { get; set; }

    public int QualificationId { get; set; }

    public int? AssessorId { get; set; }

    public int? IVId { get; set; }

    public int? PortfolioStatusId { get; set; }

    public DateTimeOffset? StartDate { get; set; }

    public DateTimeOffset? TargetEndDate { get; set; }

    public DateTimeOffset? ActualEndDate { get; set; }

    public decimal? ProgressPercentage { get; set; }

    public bool? IsActive { get; set; }

    public int? CreatedBy { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public int? ModifiedBy { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? UserAreaID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? ArchivedBy { get; set; }

    // Additional Properties
}
