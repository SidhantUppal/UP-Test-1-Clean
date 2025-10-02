using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RiskAssessmentControlMeasureScore_TO_DELETE_ViewModel
{
    [Key]
    public int RiskAssessmentControlMeasureScoreID { get; set; }

    public int RiskAssessmentControlMeasureID { get; set; }

    public int RiskAssessmentMonitorEventID { get; set; }

    public int? Score { get; set; }

    // Additional Properties
}
