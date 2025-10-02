using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ScheduledEventType", Schema = "V7")]
public partial class ScheduledEventType
{
    [Key]
    public int ScheduledEventTypeID { get; set; }

    [StringLength(100)]
    public string Title { get; set; } = null!;

    [InverseProperty("ScheduledEventType")]
    public virtual ICollection<ScheduledEvent> ScheduledEvents { get; set; } = new List<ScheduledEvent>();
}
