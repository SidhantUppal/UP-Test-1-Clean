using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ProcessExecution", Schema = "V7")]
public partial class ProcessExecution
{
    [Key]
    public int ProcessExecutionID { get; set; }

    public int ProcessID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(50)]
    public string ExecutionStatus { get; set; } = null!;

    public int StartedByUserID { get; set; }

    public DateTimeOffset StartedDate { get; set; }

    public DateTimeOffset? CompletedDate { get; set; }

    [StringLength(100)]
    public string? CurrentNodeID { get; set; }

    public string? ExecutionData { get; set; }

    public string? InputData { get; set; }

    public string? OutputData { get; set; }

    public string? ErrorMessage { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ProcessExecutionCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ProcessID")]
    [InverseProperty("ProcessExecutions")]
    public virtual Process Process { get; set; } = null!;

    [InverseProperty("ProcessExecution")]
    public virtual ICollection<ProcessStepExecution> ProcessStepExecutions { get; set; } = new List<ProcessStepExecution>();

    [ForeignKey("StartedByUserID")]
    [InverseProperty("ProcessExecutionStartedByUsers")]
    public virtual User StartedByUser { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("ProcessExecutions")]
    public virtual UserArea UserArea { get; set; } = null!;
}
