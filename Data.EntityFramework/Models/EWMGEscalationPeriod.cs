using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("EWMGEscalationPeriod", Schema = "V7")]
[Index("TaskTypeID", "TaskSeverityID", Name = "IX_EWMGEscalationPeriod_EscalationPeriod")]
public partial class EWMGEscalationPeriod
{
    [Key]
    public int EWMGEscalationPeriodID { get; set; }

    public int TaskTypeID { get; set; }

    public int? TaskSeverityID { get; set; }

    public int? Tier1AlertDaysOverdue { get; set; }

    public int? Tier2AlertDaysOverdue { get; set; }

    public int? Tier3AlertDaysOverdue { get; set; }

    public int? Tier4AlertDaysOverdue { get; set; }

    public int? Tier5AlertDaysOverdue { get; set; }

    public int? Tier6AlertDaysOverdue { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("EWMGEscalationPeriodArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("EWMGEscalationPeriodCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("EWMGEscalationPeriodModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("TaskSeverityID")]
    [InverseProperty("EWMGEscalationPeriods")]
    public virtual TaskSeverity? TaskSeverity { get; set; }

    [ForeignKey("TaskTypeID")]
    [InverseProperty("EWMGEscalationPeriods")]
    public virtual TaskType TaskType { get; set; } = null!;
}
