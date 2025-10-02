using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ProcessStepExecutionViewModel
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

    // Additional Properties
}
