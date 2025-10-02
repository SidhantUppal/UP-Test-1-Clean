using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ProcessStepViewModel
{
    [Key]
    public int ProcessStepID { get; set; }

    public int ProcessID { get; set; }

    [StringLength(100)]
    public string NodeID { get; set; } = null!;

    [StringLength(50)]
    public string NodeType { get; set; } = null!;

    [StringLength(255)]
    public string NodeName { get; set; } = null!;

    public string? Description { get; set; }

    public int SequenceOrder { get; set; }

    public string? StepConfig { get; set; }

    public bool? IsConditional { get; set; }

    public string? ConditionExpression { get; set; }

    [StringLength(100)]
    public string? NextStepOnSuccess { get; set; }

    [StringLength(100)]
    public string? NextStepOnFailure { get; set; }

    public bool? GeneratesTask { get; set; }

    public int? TaskTypeID { get; set; }

    public string? TaskTemplate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
