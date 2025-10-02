using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TaskSeverity", Schema = "V7")]
public partial class TaskSeverity
{
    [Key]
    public int TaskSeverityID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    public int? UserAreaID { get; set; }

    public int? Weighting { get; set; }

    public int? HoursDue { get; set; }

    public bool IsHazard { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    [InverseProperty("TaskSeverityNavigation")]
    public virtual ICollection<BSSTask> BSSTasks { get; set; } = new List<BSSTask>();

    [InverseProperty("TaskSeverity")]
    public virtual ICollection<Case> Cases { get; set; } = new List<Case>();

    [InverseProperty("TaskSeverity")]
    public virtual ICollection<EWMGEscalationPeriod> EWMGEscalationPeriods { get; set; } = new List<EWMGEscalationPeriod>();

    [InverseProperty("TaskSeverity")]
    public virtual ICollection<QuestionAnswer> QuestionAnswers { get; set; } = new List<QuestionAnswer>();

    [InverseProperty("TaskSeverity")]
    public virtual ICollection<SeverityType> SeverityTypes { get; set; } = new List<SeverityType>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("TaskSeverities")]
    public virtual UserArea? UserArea { get; set; }
}
