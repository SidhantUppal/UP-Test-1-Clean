using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class JobTemplateViewModel
{
    [Key]
    public int JobTemplateID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(255)]
    public string TemplateName { get; set; } = null!;

    [StringLength(1000)]
    public string? TemplateDescription { get; set; }

    [StringLength(100)]
    public string TemplateCategory { get; set; } = null!;

    public bool IsSystemTemplate { get; set; }

    public bool IsActive { get; set; }

    [StringLength(100)]
    public string DefaultJobType { get; set; } = null!;

    [StringLength(100)]
    public string DefaultCronExpression { get; set; } = null!;

    [StringLength(100)]
    public string DefaultTargetService { get; set; } = null!;

    [StringLength(500)]
    public string DefaultTargetEndpoint { get; set; } = null!;

    [StringLength(10)]
    public string DefaultHttpMethod { get; set; } = null!;

    public string? DefaultRequestHeaders { get; set; }

    public string? DefaultRequestPayload { get; set; }

    public int DefaultTimeoutSeconds { get; set; }

    public int DefaultMaxRetries { get; set; }

    public string? Instructions { get; set; }

    public string? ConfigurationSchema { get; set; }

    public string? ExamplePayload { get; set; }

    [StringLength(500)]
    public string? Tags { get; set; }

    public int UsageCount { get; set; }

    public DateTimeOffset? LastUsedDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
