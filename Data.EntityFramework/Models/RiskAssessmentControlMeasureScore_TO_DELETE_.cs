using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskAssessmentControlMeasureScore_TO_DELETE_", Schema = "V7")]
public partial class RiskAssessmentControlMeasureScore_TO_DELETE_
{
    [Key]
    public int RiskAssessmentControlMeasureScoreID { get; set; }

    public int RiskAssessmentControlMeasureID { get; set; }

    public int RiskAssessmentMonitorEventID { get; set; }

    public int? Score { get; set; }
}
