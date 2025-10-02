using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Process", Schema = "V7")]
public partial class Process
{
    [Key]
    public int ProcessID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(255)]
    public string ProcessName { get; set; } = null!;

    [StringLength(50)]
    public string ProcessType { get; set; } = null!;

    public string? Description { get; set; }

    public string? ChainDefinition { get; set; }

    public int? Version { get; set; }

    [StringLength(50)]
    public string? Status { get; set; }

    [StringLength(20)]
    public string? Priority { get; set; }

    public int? EstimatedDuration { get; set; }

    public int? MaxRetries { get; set; }

    public int? TimeoutMinutes { get; set; }

    public bool? IsTemplate { get; set; }

    [StringLength(100)]
    public string? TemplateCategory { get; set; }

    public int? CategoryTypeID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ProcessArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ProcessCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ProcessModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("Process")]
    public virtual ICollection<ProcessExecution> ProcessExecutions { get; set; } = new List<ProcessExecution>();

    [InverseProperty("Process")]
    public virtual ICollection<ProcessStep> ProcessSteps { get; set; } = new List<ProcessStep>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("Processes")]
    public virtual UserArea UserArea { get; set; } = null!;
}
