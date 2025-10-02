using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserTwoStepAuthTokenViewModel
{
    [Key]
    public int UserTwoStepAuthTokenID { get; set; }

    public int UserID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(14)]
    public string AuthToken { get; set; } = null!;

    [StringLength(36)]
    public string? SessionID { get; set; }

    public DateTimeOffset ExpiryDate { get; set; }

    // Additional Properties
}
