using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskAssessmentApprovalLog", Schema = "V7")]
[Index("ApproverUserID", Name = "IX_RiskAssessmentApprovalLog_ApproverID")]
[Index("RiskAssessmentID", Name = "IX_RiskAssessmentApprovalLog_AssessmentID")]
public partial class RiskAssessmentApprovalLog
{
    [Key]
    public int RiskAssessmentApprovalLogID { get; set; }

    public int UserAreaID { get; set; }

    public int RiskAssessmentID { get; set; }

    [StringLength(50)]
    public string ApprovalAction { get; set; } = null!;

    public int? ApprovalLevel { get; set; }

    public int ApproverUserID { get; set; }

    public DateTimeOffset ApprovalDate { get; set; }

    public string? ApprovalComments { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("ApproverUserID")]
    [InverseProperty("RiskAssessmentApprovalLogs")]
    public virtual User ApproverUser { get; set; } = null!;

    [ForeignKey("RiskAssessmentID")]
    [InverseProperty("RiskAssessmentApprovalLogs")]
    public virtual RiskAssessment RiskAssessment { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("RiskAssessmentApprovalLogs")]
    public virtual UserArea UserArea { get; set; } = null!;
}
