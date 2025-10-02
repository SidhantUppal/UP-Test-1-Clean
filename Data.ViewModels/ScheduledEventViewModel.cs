using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ScheduledEventViewModel
{
    [Key]
    public int ScheduledEventID { get; set; }

    public int ScheduledEventTypeID { get; set; }

    public int EmailFrequencyTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public bool IsEnabled { get; set; }

    public DateOnly StartDate { get; set; }

    public DateOnly? ExpiryDate { get; set; }

    public byte FirstInstanceStartHour { get; set; }

    public byte FirstInstanceStartMinute { get; set; }

    public byte? LastInstanceStartHour { get; set; }

    public byte? LastInstanceStartMinute { get; set; }

    public int RepeatEveryXMinutes { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int CreatedByUserID { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
