using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RiskAssessmentSectionTypeViewModel
{
    [Key]
    public int RiskAssessmentSectionTypeID { get; set; }

    public int RiskAssessmentTypeID { get; set; }

    public decimal Version { get; set; }

    public int OrderNum { get; set; }

    public bool IsHidden { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    [StringLength(255)]
    public string? Notes { get; set; }

    // Additional Properties
}
