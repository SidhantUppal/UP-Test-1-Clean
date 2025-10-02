using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RiskAssessmentHazardViewModel
{
    [Key]
    public int RiskAssessmentHazardID { get; set; }

    public int UserAreaID { get; set; }

    public int RiskAssessmentID { get; set; }

    public int? HazardID { get; set; }

    [StringLength(255)]
    public string? CustomHazardName { get; set; }

    public string? CustomHazardDescription { get; set; }

    public int? InherentLikelihood { get; set; }

    public int? InherentConsequence { get; set; }

    public int? InherentRiskScore { get; set; }

    public int? ResidualLikelihood { get; set; }

    public int? ResidualConsequence { get; set; }

    public int? ResidualRiskScore { get; set; }

    public string? HazardNotes { get; set; }

    public int? SequenceOrder { get; set; }

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
