using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RiskAssessmentControlMeasurePersonsInChargeViewModel
{
    [Key]
    public int RiskAssessmentControlMeasurePersonsInChargeID { get; set; }

    public int RiskAssessmentControlMeasureID { get; set; }

    public int PersonsInChargeID { get; set; }

    // Additional Properties
}
