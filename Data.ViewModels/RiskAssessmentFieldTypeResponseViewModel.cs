using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RiskAssessmentFieldTypeResponseViewModel
{
    [Key]
    public int RiskAssessmentFieldTypeResponseID { get; set; }

    public int RiskAssessmentID { get; set; }

    public int RiskAssessmentFieldTypeID { get; set; }

    public int UserAreaID { get; set; }

    public string Response { get; set; } = null!;

    [StringLength(400)]
    public string? CustomTitle { get; set; }

    // Additional Properties
}
