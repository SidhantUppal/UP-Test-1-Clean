using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TempBOSComputedViewModel
{
    public int ID { get; set; }

    public int? ParentID { get; set; }

    public int TemplateID { get; set; }

    public bool? IsLatest { get; set; }

    public string? Title { get; set; }

    [StringLength(255)]
    public string? HazardTitle { get; set; }

    public int? PreControlConsequence { get; set; }

    public int? PreControlLikelihood { get; set; }

    public int? PostControlConsequence { get; set; }

    public int? PostControlLikelihood { get; set; }

    [StringLength(255)]
    public string? ControlMeasureTitle { get; set; }

    public int? RiskAssessmentID { get; set; }

    public int? HazardID { get; set; }

    public int? ControlMeasureID { get; set; }

    public int? RiskAssessmentHazardID { get; set; }

    public int? RiskAssessmentControlMeasureID { get; set; }

    // Additional Properties
}
