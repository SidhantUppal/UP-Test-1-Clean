using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RiskAssessmentControlMeasureViewModel
{
    [Key]
    public int RiskAssessmentControlMeasureID { get; set; }

    public int UserAreaID { get; set; }

    public int RiskAssessmentID { get; set; }

    public int? RiskAssessmentHazardID { get; set; }

    public int? ControlMeasureID { get; set; }

    [StringLength(255)]
    public string? CustomControlName { get; set; }

    public string? CustomControlDescription { get; set; }

    [StringLength(50)]
    public string? ImplementationStatus { get; set; }

    public DateTimeOffset? ImplementationDate { get; set; }

    public int? ResponsiblePersonID { get; set; }

    public decimal? EffectivenessRating { get; set; }

    public bool? MonitoringRequired { get; set; }

    [StringLength(100)]
    public string? MonitoringFrequency { get; set; }

    public string? ControlNotes { get; set; }

    public decimal? Cost { get; set; }

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
