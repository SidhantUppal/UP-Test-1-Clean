using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ComplianceScoreLabelTypeViewModel
{
    [Key]
    public int ComplianceScoreLabelTypeID { get; set; }

    public int ComplianceScoreTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public int Score { get; set; }

    [StringLength(10)]
    public string? Colour { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    // Additional Properties
}
