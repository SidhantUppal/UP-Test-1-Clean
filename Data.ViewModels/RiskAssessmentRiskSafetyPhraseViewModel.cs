using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RiskAssessmentRiskSafetyPhraseViewModel
{
    [Key]
    public int RiskAssessmentRiskSafetyPhraseID { get; set; }

    public int RiskAssessmentID { get; set; }

    public int RiskSafetyPhraseID { get; set; }

    // Additional Properties
}
