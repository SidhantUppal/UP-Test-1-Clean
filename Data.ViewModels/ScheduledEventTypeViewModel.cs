using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ScheduledEventTypeViewModel
{
    [Key]
    public int ScheduledEventTypeID { get; set; }

    [StringLength(100)]
    public string Title { get; set; } = null!;

    // Additional Properties
}
