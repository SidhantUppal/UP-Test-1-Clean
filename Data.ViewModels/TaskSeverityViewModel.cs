using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TaskSeverityViewModel
{
    [Key]
    public int TaskSeverityID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    public int? UserAreaID { get; set; }

    public int? Weighting { get; set; }

    public int? HoursDue { get; set; }

    public bool IsHazard { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    // Additional Properties
}
