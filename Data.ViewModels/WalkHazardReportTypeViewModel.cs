using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class WalkHazardReportTypeViewModel
{
    [Key]
    public int WalkHazardReportTypeID { get; set; }

    public int? WalkID { get; set; }

    public int? WalkTemplateID { get; set; }

    public int HazardReportTypeID { get; set; }

    // Additional Properties
}
