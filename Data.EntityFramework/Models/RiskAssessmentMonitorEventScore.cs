using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskAssessmentMonitorEventScore", Schema = "V7")]
[Index("UserAreaID", "RiskAssessmentID", Name = "IX_RiskAssessmentMonitorEventScore_UserAreaRiskAssessment")]
[Index("UserAreaID", "RiskAssessmentID", "RiskAssessmentMonitorEventID", Name = "IX_RiskAssessmentMonitorEventScore_UserAreaRiskAssessmentMonitorEvent")]
public partial class RiskAssessmentMonitorEventScore
{
    [Key]
    public int RiskAssessmentMonitorEventScoreID { get; set; }

    public int UserAreaID { get; set; }

    public int RiskAssessmentMonitorEventID { get; set; }

    public int RiskAssessmentID { get; set; }

    public int? RiskAssessmentFieldTypeID { get; set; }

    public int? RiskAssessmentControlMeasureID { get; set; }

    public int Score { get; set; }

    [ForeignKey("RiskAssessmentID")]
    [InverseProperty("RiskAssessmentMonitorEventScores")]
    public virtual RiskAssessment RiskAssessment { get; set; } = null!;

    [ForeignKey("RiskAssessmentControlMeasureID")]
    [InverseProperty("RiskAssessmentMonitorEventScores")]
    public virtual RiskAssessmentControlMeasure? RiskAssessmentControlMeasure { get; set; }

    [ForeignKey("RiskAssessmentFieldTypeID")]
    [InverseProperty("RiskAssessmentMonitorEventScores")]
    public virtual RiskAssessmentFieldType? RiskAssessmentFieldType { get; set; }

    [ForeignKey("RiskAssessmentMonitorEventID")]
    [InverseProperty("RiskAssessmentMonitorEventScores")]
    public virtual RiskAssessmentMonitorEvent RiskAssessmentMonitorEvent { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("RiskAssessmentMonitorEventScores")]
    public virtual UserArea UserArea { get; set; } = null!;
}
