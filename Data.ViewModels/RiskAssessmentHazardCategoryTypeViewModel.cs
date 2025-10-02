using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RiskAssessmentHazardCategoryTypeViewModel
{
    [Key]
    public int RiskAssessmentHazardCategoryTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public int RiskAssessmentID { get; set; }

    public int HazardCategoryTypeID { get; set; }

    public bool HasSharedRiskLevel { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
}
