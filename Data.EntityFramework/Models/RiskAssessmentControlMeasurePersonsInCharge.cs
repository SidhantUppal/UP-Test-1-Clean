using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskAssessmentControlMeasurePersonsInCharge", Schema = "V7")]
public partial class RiskAssessmentControlMeasurePersonsInCharge
{
    [Key]
    public int RiskAssessmentControlMeasurePersonsInChargeID { get; set; }

    public int RiskAssessmentControlMeasureID { get; set; }

    public int PersonsInChargeID { get; set; }
}
