using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("EmailFrequencyType", Schema = "V7")]
public partial class EmailFrequencyType
{
    [Key]
    public int EmailFrequencyTypeID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    [InverseProperty("EmailFrequencyType")]
    public virtual ICollection<ScheduledEvent> ScheduledEvents { get; set; } = new List<ScheduledEvent>();

    [InverseProperty("AssignerOverDueFrequency")]
    public virtual ICollection<UserAreaTaskSetting> UserAreaTaskSettingAssignerOverDueFrequencies { get; set; } = new List<UserAreaTaskSetting>();

    [InverseProperty("TaskDueAlertFrequency")]
    public virtual ICollection<UserAreaTaskSetting> UserAreaTaskSettingTaskDueAlertFrequencies { get; set; } = new List<UserAreaTaskSetting>();
}
