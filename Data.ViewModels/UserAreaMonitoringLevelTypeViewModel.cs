using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaMonitoringLevelTypeViewModel
{
    [Key]
    public int UserAreaMonitoringLevelTypeID { get; set; }

    [StringLength(20)]
    public string Reference { get; set; } = null!;

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    // Additional Properties
}
