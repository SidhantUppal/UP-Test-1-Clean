using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RiskAssessmentApprovalLogViewModel
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

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
