using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class CaseEmailNotificationViewModel
{
    [Key]
    public int CaseEmailNotificationID { get; set; }

    public int CaseID { get; set; }

    [StringLength(255)]
    public string EmailTo { get; set; } = null!;

    [StringLength(255)]
    public string EmailSubject { get; set; } = null!;

    public string EmailBody { get; set; } = null!;

    public bool IsSent { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public DateTimeOffset? ProcessedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
