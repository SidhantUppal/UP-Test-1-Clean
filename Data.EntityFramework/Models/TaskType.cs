using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TaskType", Schema = "V7")]
public partial class TaskType
{
    [Key]
    public int TaskTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(50)]
    public string Title { get; set; } = null!;

    public bool IsSystemGenerated { get; set; }

    public bool IsUserAbleToCreate { get; set; }

    public bool IsLive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("TaskTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("TaskType")]
    public virtual ICollection<BSSTask> BSSTasks { get; set; } = new List<BSSTask>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("TaskTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("TaskType")]
    public virtual ICollection<EWMGEscalationPeriod> EWMGEscalationPeriods { get; set; } = new List<EWMGEscalationPeriod>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("TaskTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("TaskType")]
    public virtual ICollection<ProcessStep> ProcessSteps { get; set; } = new List<ProcessStep>();

    [InverseProperty("TaskType")]
    public virtual ICollection<TaskSchedule> TaskSchedules { get; set; } = new List<TaskSchedule>();

    [InverseProperty("TaskType")]
    public virtual ICollection<TaskTypeUserArea> TaskTypeUserAreas { get; set; } = new List<TaskTypeUserArea>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("TaskTypes")]
    public virtual UserArea? UserArea { get; set; }

    [InverseProperty("TaskType")]
    public virtual ICollection<UserAreaTaskType> UserAreaTaskTypes { get; set; } = new List<UserAreaTaskType>();
}
