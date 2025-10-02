using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ScheduledEventLogViewModel
{
    [Key]
    public int ScheduledEventLogID { get; set; }

    public int ScheduledEventID { get; set; }

    public DateTimeOffset StartDateTime { get; set; }

    public DateTimeOffset? EndDateTime { get; set; }

    [StringLength(255)]
    public string? Notes { get; set; }

    // Additional Properties
}
