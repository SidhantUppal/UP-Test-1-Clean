using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HRCasePingViewModel
{
    [Key]
    public int HRCasePingID { get; set; }

    public int HRCaseID { get; set; }

    public int UserID { get; set; }

    public int? EmulatingUserID { get; set; }

    public DateTimeOffset DateTime { get; set; }

    public bool IsViaAJAX { get; set; }

    [StringLength(36)]
    public string? SessionID { get; set; }

    // Additional Properties
}
