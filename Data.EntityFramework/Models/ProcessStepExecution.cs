using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ProcessStepExecution", Schema = "V7")]
public partial class ProcessStepExecution
{
    [Key]
    public int ProcessStepExecutionID { get; set; }

    public int ProcessExecutionID { get; set; }

    public int ProcessStepID { get; set; }

    [StringLength(50)]
    public string ExecutionStatus { get; set; } = null!;

    public DateTimeOffset? StartedDate { get; set; }

    public DateTimeOffset? CompletedDate { get; set; }

    public string? InputData { get; set; }

    public string? OutputData { get; set; }

    public string? ErrorMessage { get; set; }

    public int? RetryCount { get; set; }

    public int? GeneratedTaskID { get; set; }

    public string? EvidenceData { get; set; }

    public int? CompletedByUserID { get; set; }

    public string? CompletionNotes { get; set; }

    [ForeignKey("CompletedByUserID")]
    [InverseProperty("ProcessStepExecutions")]
    public virtual User? CompletedByUser { get; set; }

    [ForeignKey("GeneratedTaskID")]
    [InverseProperty("ProcessStepExecutions")]
    public virtual BSSTask? GeneratedTask { get; set; }

    [ForeignKey("ProcessExecutionID")]
    [InverseProperty("ProcessStepExecutions")]
    public virtual ProcessExecution ProcessExecution { get; set; } = null!;

    [ForeignKey("ProcessStepID")]
    [InverseProperty("ProcessStepExecutions")]
    public virtual ProcessStep ProcessStep { get; set; } = null!;
}
