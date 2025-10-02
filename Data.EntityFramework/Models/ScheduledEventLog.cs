using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ScheduledEventLog", Schema = "V7")]
[Index("ScheduledEventID", Name = "IX_ScheduledEventLog_ScheduledEvent")]
public partial class ScheduledEventLog
{
    [Key]
    public int ScheduledEventLogID { get; set; }

    public int ScheduledEventID { get; set; }

    public DateTimeOffset StartDateTime { get; set; }

    public DateTimeOffset? EndDateTime { get; set; }

    [StringLength(255)]
    public string? Notes { get; set; }

    [ForeignKey("ScheduledEventID")]
    [InverseProperty("ScheduledEventLogs")]
    public virtual ScheduledEvent ScheduledEvent { get; set; } = null!;
}
