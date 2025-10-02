using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SSOWApprovalLog", Schema = "V7")]
public partial class SSOWApprovalLog
{
    [Key]
    public int SSOWApprovalLogID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(50)]
    public string DocumentType { get; set; } = null!;

    public int DocumentID { get; set; }

    [StringLength(50)]
    public string ApprovalAction { get; set; } = null!;

    public int? ApprovalLevel { get; set; }

    public int ApproverUserID { get; set; }

    public DateTimeOffset ApprovalDate { get; set; }

    public string? ApprovalComments { get; set; }

    [StringLength(20)]
    public string? DocumentVersion { get; set; }

    [StringLength(50)]
    public string? DocumentStatus { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("ApproverUserID")]
    [InverseProperty("SSOWApprovalLogs")]
    public virtual User ApproverUser { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("SSOWApprovalLogs")]
    public virtual UserArea UserArea { get; set; } = null!;
}
