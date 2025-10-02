using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskAssessmentConversion", Schema = "V7")]
public partial class RiskAssessmentConversion
{
    [Key]
    public int RiskAssessmentConversionID { get; set; }

    public int UserAreaID { get; set; }

    public int SourceRiskAssessmentID { get; set; }

    public int NewRiskAssessmentID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("RiskAssessmentConversionArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("RiskAssessmentConversionCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("NewRiskAssessmentID")]
    [InverseProperty("RiskAssessmentConversionNewRiskAssessments")]
    public virtual RiskAssessment NewRiskAssessment { get; set; } = null!;

    [ForeignKey("SourceRiskAssessmentID")]
    [InverseProperty("RiskAssessmentConversionSourceRiskAssessments")]
    public virtual RiskAssessment SourceRiskAssessment { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("RiskAssessmentConversions")]
    public virtual UserArea UserArea { get; set; } = null!;
}
