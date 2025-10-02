using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RiskAssessmentFieldTypeViewModel
{
    [Key]
    public int RiskAssessmentFieldTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public int RiskAssessmentSectionTypeID { get; set; }

    public int Ident { get; set; }

    [StringLength(50)]
    public string Type { get; set; } = null!;

    public int OrderNum { get; set; }

    public bool IsRequired { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    [StringLength(1000)]
    public string? Options { get; set; }

    public bool IsControlMeasure { get; set; }

    public int? HazardID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
}
