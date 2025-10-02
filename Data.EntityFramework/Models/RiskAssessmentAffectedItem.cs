using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskAssessmentAffectedItem", Schema = "V7")]
[Index("RiskAssessmentHazardID", Name = "Risk_Assesment_Hazard_ID")]
public partial class RiskAssessmentAffectedItem
{
    [Key]
    public int RiskAssessmentAffectedItemID { get; set; }

    public int AffectedItemID { get; set; }

    public int RiskAssessmentID { get; set; }

    public int? RiskAssessmentHazardID { get; set; }

    public int? PositionIndex { get; set; }

    public int? CreatedByUserID { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("AffectedItemID")]
    [InverseProperty("RiskAssessmentAffectedItems")]
    public virtual AffectedItem AffectedItem { get; set; } = null!;

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("RiskAssessmentAffectedItemArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("RiskAssessmentAffectedItemCreatedByUsers")]
    public virtual User? CreatedByUser { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("RiskAssessmentAffectedItemModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("RiskAssessmentID")]
    [InverseProperty("RiskAssessmentAffectedItems")]
    public virtual RiskAssessment RiskAssessment { get; set; } = null!;

    [ForeignKey("RiskAssessmentHazardID")]
    [InverseProperty("RiskAssessmentAffectedItems")]
    public virtual RiskAssessmentHazard? RiskAssessmentHazard { get; set; }
}
