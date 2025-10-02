using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TaskSchedule", Schema = "V7")]
public partial class TaskSchedule
{
    [Key]
    public int TaskScheduleID { get; set; }

    public int UserAreaID { get; set; }

    public int TaskTypeID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(1000)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public DateOnly StartDate { get; set; }

    public DateOnly? NextProcessingDate { get; set; }

    public int FrequencyTypeID { get; set; }

    public int? FrequencyPeriod { get; set; }

    public byte TaskDueAlertPeriodOverride { get; set; }

    public bool IsOneTaskCreatedForMultiple { get; set; }

    public bool IsNextProcessingDone { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("TaskScheduleArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("TaskSchedule")]
    public virtual ICollection<BSSTask> BSSTasks { get; set; } = new List<BSSTask>();

    [InverseProperty("TaskSchedule")]
    public virtual ICollection<ChecklistAssignment> ChecklistAssignments { get; set; } = new List<ChecklistAssignment>();

    [InverseProperty("TaskSchedule")]
    public virtual ICollection<ChecklistTemplateAssignment> ChecklistTemplateAssignments { get; set; } = new List<ChecklistTemplateAssignment>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("TaskScheduleCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("FrequencyTypeID")]
    [InverseProperty("TaskSchedules")]
    public virtual FrequencyType FrequencyType { get; set; } = null!;

    [InverseProperty("TaskSchedule")]
    public virtual ICollection<HRCase> HRCases { get; set; } = new List<HRCase>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("TaskScheduleModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("TaskSchedule")]
    public virtual ICollection<TaskReassignmentLog> TaskReassignmentLogs { get; set; } = new List<TaskReassignmentLog>();

    [InverseProperty("TaskSchedule")]
    public virtual ICollection<TaskScheduleAssignment> TaskScheduleAssignments { get; set; } = new List<TaskScheduleAssignment>();

    [InverseProperty("TaskSchedule")]
    public virtual ICollection<TaskScheduleEmployee> TaskScheduleEmployees { get; set; } = new List<TaskScheduleEmployee>();

    [InverseProperty("TaskSchedule")]
    public virtual ICollection<TaskScheduleNonEmployee> TaskScheduleNonEmployees { get; set; } = new List<TaskScheduleNonEmployee>();

    [InverseProperty("TaskSchedule")]
    public virtual ICollection<TaskScheduleOrgGroup> TaskScheduleOrgGroups { get; set; } = new List<TaskScheduleOrgGroup>();

    [ForeignKey("TaskTypeID")]
    [InverseProperty("TaskSchedules")]
    public virtual TaskType TaskType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("TaskSchedules")]
    public virtual UserArea UserArea { get; set; } = null!;

    [InverseProperty("TaskSchedule")]
    public virtual ICollection<WalkAssignment> WalkAssignments { get; set; } = new List<WalkAssignment>();
}
