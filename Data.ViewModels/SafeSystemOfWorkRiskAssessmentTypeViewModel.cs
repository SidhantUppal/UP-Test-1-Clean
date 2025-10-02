using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class SafeSystemOfWorkRiskAssessmentTypeViewModel
{
    [Key]
    public int SafeSystemOfWorkRiskAssessmentTypeID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    public bool HasRelatedRiskAssessments { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    // Additional Properties
}
