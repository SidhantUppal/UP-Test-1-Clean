using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DefaultDashboardUserViewModel
{
    [Key]
    public int DefaultDashboardUserID { get; set; }

    public int DefaultDashboardID { get; set; }

    public int UserID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
