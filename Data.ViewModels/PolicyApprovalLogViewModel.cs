using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class PolicyApprovalLogViewModel
{
    [Key]
    public int PolicyApprovalLogID { get; set; }

    public int UserAreaID { get; set; }

    public int PolicyID { get; set; }

    [StringLength(50)]
    public string ApprovalAction { get; set; } = null!;

    public int? ApprovalLevel { get; set; }

    public int ApproverUserID { get; set; }

    public DateTimeOffset ApprovalDate { get; set; }

    public string? ApprovalComments { get; set; }

    public string? ConditionsOfApproval { get; set; }

    [StringLength(20)]
    public string? PolicyVersion { get; set; }

    [StringLength(50)]
    public string? PolicyStatus { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
