using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("JobExecution", Schema = "V7")]
[Index("ScheduledJobID", "ExecutionStartTime", Name = "IX_JobExecution_ScheduledJobID_ExecutionStartTime", IsDescending = new[] { false, true })]
public partial class JobExecution
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

    [Column(TypeName = "decimal(10, 2)")]
    public decimal? MemoryUsageMB { get; set; }

    [Column(TypeName = "decimal(5, 2)")]
    public decimal? CpuUsagePercent { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("JobExecutionArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("JobExecutionCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("JobExecutionModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("ScheduledJobID")]
    [InverseProperty("JobExecutions")]
    public virtual ScheduledJob ScheduledJob { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("JobExecutions")]
    public virtual UserArea UserArea { get; set; } = null!;
}
