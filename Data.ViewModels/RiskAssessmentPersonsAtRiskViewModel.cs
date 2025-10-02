using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RiskAssessmentPersonsAtRiskViewModel
{
    [Key]
    public int RiskAssessmentPersonsAtRiskID { get; set; }

    public int UserAreaID { get; set; }

    public int RiskAssessmentID { get; set; }

    public int? PersonsAtRiskID { get; set; }

    [StringLength(255)]
    public string? CustomCategoryName { get; set; }

    [StringLength(500)]
    public string? CustomCategoryDescription { get; set; }

    public int? NumberOfPeople { get; set; }

    public string? VulnerabilityNotes { get; set; }

    public string? SpecificPrecautions { get; set; }

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
