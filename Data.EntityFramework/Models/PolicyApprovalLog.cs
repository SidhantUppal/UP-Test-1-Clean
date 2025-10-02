using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("PolicyApprovalLog", Schema = "V7")]
[Index("ApproverUserID", Name = "IX_PolicyApprovalLog_ApproverUserID")]
[Index("PolicyID", Name = "IX_PolicyApprovalLog_PolicyID")]
public partial class PolicyApprovalLog
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

    [ForeignKey("ApproverUserID")]
    [InverseProperty("PolicyApprovalLogs")]
    public virtual User ApproverUser { get; set; } = null!;

    [ForeignKey("PolicyID")]
    [InverseProperty("PolicyApprovalLogs")]
    public virtual Policy Policy { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("PolicyApprovalLogs")]
    public virtual UserArea UserArea { get; set; } = null!;
}
