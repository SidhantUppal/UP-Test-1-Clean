using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RiskAssessmentMonitorEventScoreViewModel
{
    [Key]
    public int RiskAssessmentMonitorEventScoreID { get; set; }

    public int UserAreaID { get; set; }

    public int RiskAssessmentMonitorEventID { get; set; }

    public int RiskAssessmentID { get; set; }

    public int? RiskAssessmentFieldTypeID { get; set; }

    public int? RiskAssessmentControlMeasureID { get; set; }

    public int Score { get; set; }

    // Additional Properties
}
