using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskAssessmentFieldTypeScore_TO_DELETE_", Schema = "V7")]
public partial class RiskAssessmentFieldTypeScore_TO_DELETE_
{
    [Key]
    public int RiskAssessmentFieldTypeScoreID { get; set; }

    public int RiskAssessmentMonitorEventID { get; set; }

    public int RiskAssessmentID { get; set; }

    public int RiskAssessmentFieldTypeID { get; set; }

    public int UserAreaID { get; set; }

    public int Score { get; set; }
}
