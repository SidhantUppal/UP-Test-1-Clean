using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("MobileSubmission", Schema = "V7")]
public partial class MobileSubmission
{
    [Key]
    public int MobileSubmissionID { get; set; }

    public int? QuestionnaireResponseID { get; set; }

    public int? AccidentCaseID { get; set; }

    public int? TaskID { get; set; }

    public int? AssetInspectionID { get; set; }

    public int? UserAreaID { get; set; }

    public bool IsProcessed { get; set; }

    public DateTimeOffset SubmissionDate { get; set; }

    public DateTimeOffset? ProcessedDate { get; set; }

    public int? RiskAssessmentID { get; set; }

    public int? RiskAssessmentMonitorEventID { get; set; }

    [ForeignKey("AccidentCaseID")]
    [InverseProperty("MobileSubmissions")]
    public virtual AccidentCase? AccidentCase { get; set; }

    [ForeignKey("AssetInspectionID")]
    [InverseProperty("MobileSubmissions")]
    public virtual AssetInspection? AssetInspection { get; set; }

    [ForeignKey("QuestionnaireResponseID")]
    [InverseProperty("MobileSubmissions")]
    public virtual QuestionnaireResponse? QuestionnaireResponse { get; set; }

    [ForeignKey("RiskAssessmentID")]
    [InverseProperty("MobileSubmissions")]
    public virtual RiskAssessment? RiskAssessment { get; set; }

    [ForeignKey("RiskAssessmentMonitorEventID")]
    [InverseProperty("MobileSubmissions")]
    public virtual RiskAssessmentMonitorEvent? RiskAssessmentMonitorEvent { get; set; }

    [ForeignKey("TaskID")]
    [InverseProperty("MobileSubmissions")]
    public virtual BSSTask? Task { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("MobileSubmissions")]
    public virtual UserArea? UserArea { get; set; }
}
