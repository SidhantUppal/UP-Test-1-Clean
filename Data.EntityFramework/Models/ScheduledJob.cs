using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ScheduledJob", Schema = "V7")]
public partial class ScheduledJob
{
    [Key]
    public int ScheduledJobID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(255)]
    public string JobName { get; set; } = null!;

    [StringLength(1000)]
    public string? JobDescription { get; set; }

    [StringLength(100)]
    public string JobType { get; set; } = null!;

    public bool IsActive { get; set; }

    public bool IsPaused { get; set; }

    [StringLength(100)]
    public string CronExpression { get; set; } = null!;

    [StringLength(100)]
    public string TimeZone { get; set; } = null!;

    public DateTimeOffset? NextRunTime { get; set; }

    public DateTimeOffset? LastRunTime { get; set; }

    [StringLength(100)]
    public string TargetService { get; set; } = null!;

    [StringLength(500)]
    public string TargetEndpoint { get; set; } = null!;

    [StringLength(10)]
    public string HttpMethod { get; set; } = null!;

    public string? RequestHeaders { get; set; }

    public string? RequestPayload { get; set; }

    public int TimeoutSeconds { get; set; }

    public int MaxRetries { get; set; }

    public int RetryDelaySeconds { get; set; }

    [StringLength(500)]
    public string? OnFailureNotify { get; set; }

    public int? MaxExecutionsPerHour { get; set; }

    public int? MaxExecutionsPerDay { get; set; }

    public DateTimeOffset? ExecutionStartDate { get; set; }

    public DateTimeOffset? ExecutionEndDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ScheduledJobArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ScheduledJobCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("ScheduledJob")]
    public virtual ICollection<JobExecution> JobExecutions { get; set; } = new List<JobExecution>();

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ScheduledJobModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("ScheduledJobs")]
    public virtual UserArea UserArea { get; set; } = null!;
}
