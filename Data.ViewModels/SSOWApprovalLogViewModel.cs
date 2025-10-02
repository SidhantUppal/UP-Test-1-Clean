using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class SSOWApprovalLogViewModel
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

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
