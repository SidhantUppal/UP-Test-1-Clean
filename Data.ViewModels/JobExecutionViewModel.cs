using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class JobExecutionViewModel
{
    [Key]
    public int JobExecutionID { get; set; }

    public int UserAreaID { get; set; }

    public int ScheduledJobID { get; set; }

    public DateTimeOffset ExecutionStartTime { get; set; }

    public DateTimeOffset? ExecutionEndTime { get; set; }

    public int? ExecutionDurationMs { get; set; }

    [StringLength(50)]
    public string ExecutionStatus { get; set; } = null!;

    public int AttemptNumber { get; set; }

    public bool IsRetry { get; set; }

    [StringLength(1000)]
    public string RequestUrl { get; set; } = null!;

    [StringLength(10)]
    public string RequestMethod { get; set; } = null!;

    public string? RequestHeaders { get; set; }

    public string? RequestPayload { get; set; }

    public int? ResponseStatusCode { get; set; }

    public string? ResponseHeaders { get; set; }

    public string? ResponseBody { get; set; }

    public int? ResponseTimeMs { get; set; }

    [StringLength(2000)]
    public string? ErrorMessage { get; set; }

    public string? ErrorStackTrace { get; set; }

    [StringLength(100)]
    public string? ErrorCode { get; set; }

    public decimal? MemoryUsageMB { get; set; }

    public decimal? CpuUsagePercent { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
