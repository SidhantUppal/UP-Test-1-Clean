using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskAssessmentHazard", Schema = "V7")]
[Index("RiskAssessmentID", Name = "IX_RiskAssessmentHazard_AssessmentID")]
public partial class RiskAssessmentHazard
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

    [ForeignKey("HazardID")]
    [InverseProperty("RiskAssessmentHazards")]
    public virtual Hazard? Hazard { get; set; }

    [ForeignKey("RiskAssessmentID")]
    [InverseProperty("RiskAssessmentHazards")]
    public virtual RiskAssessment RiskAssessment { get; set; } = null!;

    [InverseProperty("RiskAssessmentHazard")]
    public virtual ICollection<RiskAssessmentAffectedItem> RiskAssessmentAffectedItems { get; set; } = new List<RiskAssessmentAffectedItem>();

    [InverseProperty("RiskAssessmentHazard")]
    public virtual ICollection<RiskAssessmentControlMeasure> RiskAssessmentControlMeasures { get; set; } = new List<RiskAssessmentControlMeasure>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("RiskAssessmentHazards")]
    public virtual UserArea UserArea { get; set; } = null!;
}
