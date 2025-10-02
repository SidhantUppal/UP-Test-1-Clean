using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class LogUserLoginViewModel
{
    [Key]
    public int LogUserLoginID { get; set; }

    public int UserAreaID { get; set; }

    public int UserID { get; set; }

    public DateTimeOffset DateTime { get; set; }

    [StringLength(36)]
    public string? GUID { get; set; }

    [StringLength(255)]
    public string? SessionID { get; set; }

    public DateTimeOffset? LogoutDateTime { get; set; }

    // Additional Properties
}
