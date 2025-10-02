using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class SafeWorkingProcedureStepViewModel
{
    [Key]
    public int SafeWorkingProcedureStepID { get; set; }

    public int UserAreaID { get; set; }

    public int SafeWorkingProcedureID { get; set; }

    public int StepNumber { get; set; }

    [StringLength(255)]
    public string StepTitle { get; set; } = null!;

    public string StepDescription { get; set; } = null!;

    public string? HazardControls { get; set; }

    public bool? CriticalControlPoint { get; set; }

    public bool? VerificationRequired { get; set; }

    [StringLength(500)]
    public string? VerificationMethod { get; set; }

    public string? RequiredResources { get; set; }

    public string? RequiredDocuments { get; set; }

    public string? WarningsAndCautions { get; set; }

    public string? Notes { get; set; }

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
