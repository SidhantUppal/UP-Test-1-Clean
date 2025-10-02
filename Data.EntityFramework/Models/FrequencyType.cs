using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("FrequencyType", Schema = "V7")]
public partial class FrequencyType
{
    [Key]
    public int FrequencyTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(100)]
    public string Title { get; set; } = null!;

    [StringLength(255)]
    public string? Description { get; set; }

    [InverseProperty("RenewalFrequencyType")]
    public virtual ICollection<ChecklistTemplate> ChecklistTemplates { get; set; } = new List<ChecklistTemplate>();

    [InverseProperty("RenewalFrequencyType")]
    public virtual ICollection<Checklist> Checklists { get; set; } = new List<Checklist>();

    [InverseProperty("FrequencyType")]
    public virtual ICollection<ExposureTypeTraining> ExposureTypeTrainings { get; set; } = new List<ExposureTypeTraining>();

    [InverseProperty("FrequencyType")]
    public virtual ICollection<TaskSchedule> TaskSchedules { get; set; } = new List<TaskSchedule>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("FrequencyTypes")]
    public virtual UserArea? UserArea { get; set; }

    [InverseProperty("MonitorDefaultFrequencyType")]
    public virtual ICollection<UserAreaRiskAssessmentSetting> UserAreaRiskAssessmentSettingMonitorDefaultFrequencyTypes { get; set; } = new List<UserAreaRiskAssessmentSetting>();

    [InverseProperty("ReviewDefaultFrequencyType")]
    public virtual ICollection<UserAreaRiskAssessmentSetting> UserAreaRiskAssessmentSettingReviewDefaultFrequencyTypes { get; set; } = new List<UserAreaRiskAssessmentSetting>();

    [InverseProperty("FurtherActionsDueWithinFrequencyType")]
    public virtual ICollection<UserAreaTaskSetting> UserAreaTaskSettings { get; set; } = new List<UserAreaTaskSetting>();
}
