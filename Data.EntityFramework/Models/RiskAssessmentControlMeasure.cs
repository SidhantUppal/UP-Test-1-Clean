using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskAssessmentControlMeasure", Schema = "V7")]
[Index("RiskAssessmentID", Name = "IX_RiskAssessmentControlMeasure_AssessmentID")]
[Index("RiskAssessmentHazardID", Name = "IX_RiskAssessmentControlMeasure_HazardID")]
public partial class RiskAssessmentControlMeasure
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

    [Column(TypeName = "decimal(3, 1)")]
    public decimal? EffectivenessRating { get; set; }

    public bool? MonitoringRequired { get; set; }

    [StringLength(100)]
    public string? MonitoringFrequency { get; set; }

    public string? ControlNotes { get; set; }

    [Column(TypeName = "decimal(10, 2)")]
    public decimal? Cost { get; set; }

    public int? SequenceOrder { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ControlMeasureID")]
    [InverseProperty("RiskAssessmentControlMeasures")]
    public virtual ControlMeasure? ControlMeasure { get; set; }

    [ForeignKey("ResponsiblePersonID")]
    [InverseProperty("RiskAssessmentControlMeasures")]
    public virtual User? ResponsiblePerson { get; set; }

    [ForeignKey("RiskAssessmentID")]
    [InverseProperty("RiskAssessmentControlMeasures")]
    public virtual RiskAssessment RiskAssessment { get; set; } = null!;

    [ForeignKey("RiskAssessmentHazardID")]
    [InverseProperty("RiskAssessmentControlMeasures")]
    public virtual RiskAssessmentHazard? RiskAssessmentHazard { get; set; }

    [InverseProperty("RiskAssessmentControlMeasure")]
    public virtual ICollection<RiskAssessmentMonitorEventScore> RiskAssessmentMonitorEventScores { get; set; } = new List<RiskAssessmentMonitorEventScore>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("RiskAssessmentControlMeasures")]
    public virtual UserArea UserArea { get; set; } = null!;
}
