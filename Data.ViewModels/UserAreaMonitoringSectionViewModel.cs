using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaMonitoringSectionViewModel
{
    [Key]
    public int UserAreaMonitoringSectionID { get; set; }

    [StringLength(20)]
    public string Reference { get; set; } = null!;

    public bool IsSystemConfigurable { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    // Additional Properties
}
