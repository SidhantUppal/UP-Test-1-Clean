using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ScheduledTaskViewModel
{
    [Key]
    public int TaskID { get; set; }

    [StringLength(50)]
    public string? Description { get; set; }

    [StringLength(50)]
    public string Domain { get; set; } = null!;

    public byte Version { get; set; }

    [StringLength(50)]
    public string Controller { get; set; } = null!;

    [StringLength(50)]
    public string Action { get; set; } = null!;

    public byte IntervalType { get; set; }

    public byte Interval { get; set; }

    public byte StartHour { get; set; }

    public byte StartMinute { get; set; }

    // Additional Properties
}
