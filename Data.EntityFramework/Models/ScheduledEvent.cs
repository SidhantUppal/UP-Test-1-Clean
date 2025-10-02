using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ScheduledEvent", Schema = "V7")]
public partial class ScheduledEvent
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

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ScheduledEvents")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("EmailFrequencyTypeID")]
    [InverseProperty("ScheduledEvents")]
    public virtual EmailFrequencyType EmailFrequencyType { get; set; } = null!;

    [InverseProperty("ScheduledEvent")]
    public virtual ICollection<ScheduledEventLog> ScheduledEventLogs { get; set; } = new List<ScheduledEventLog>();

    [ForeignKey("ScheduledEventTypeID")]
    [InverseProperty("ScheduledEvents")]
    public virtual ScheduledEventType ScheduledEventType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("ScheduledEvents")]
    public virtual UserArea? UserArea { get; set; }
}
