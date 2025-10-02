using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class WalkHazardReportViewModel
{
    [Key]
    public int WalkHazardReportID { get; set; }

    public int HazardReportID { get; set; }

    public int WalkResponseID { get; set; }

    public int? WalkCheckpointID { get; set; }

    // Additional Properties
}
