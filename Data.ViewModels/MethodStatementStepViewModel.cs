using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class MethodStatementStepViewModel
{
    [Key]
    public int MethodStatementStepID { get; set; }

    public int UserAreaID { get; set; }

    public int MethodStatementID { get; set; }

    public int StepNumber { get; set; }

    [StringLength(255)]
    public string StepTitle { get; set; } = null!;

    public string StepDescription { get; set; } = null!;

    public int? StepDuration { get; set; }

    public int? PersonnelRequired { get; set; }

    [StringLength(500)]
    public string? SpecificRoles { get; set; }

    public string? KeyHazards { get; set; }

    public string? SafetyPrecautions { get; set; }

    [StringLength(500)]
    public string? RequiredPPE { get; set; }

    public string? RequiredEquipment { get; set; }

    public string? ToolsRequired { get; set; }

    public string? InspectionPoints { get; set; }

    public string? QualityChecks { get; set; }

    public string? AcceptanceCriteria { get; set; }

    public string? CriticalControlPoints { get; set; }

    public string? EnvironmentalConsiderations { get; set; }

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
