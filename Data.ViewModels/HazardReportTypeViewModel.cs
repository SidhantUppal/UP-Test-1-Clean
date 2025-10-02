using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HazardReportTypeViewModel
{
    [Key]
    public int HazardReportTypeID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    // Additional Properties
}
