using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ProcessExecutionViewModel
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

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
