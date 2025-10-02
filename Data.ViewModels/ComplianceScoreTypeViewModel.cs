using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ComplianceScoreTypeViewModel
{
    [Key]
    public int ComplianceScoreTypeID { get; set; }

    [StringLength(20)]
    public string? Reference { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    // Additional Properties
}
