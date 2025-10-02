using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaMonitoringReportTypeViewModel
{
    [Key]
    public int UserAreaMonitoringReportTypeID { get; set; }

    [StringLength(250)]
    public string Title { get; set; } = null!;

    [StringLength(1000)]
    public string? Description { get; set; }

    // Additional Properties
}
