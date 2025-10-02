using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskAssessmentPersonsAtRisk", Schema = "V7")]
public partial class RiskAssessmentPersonsAtRisk
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

    [ForeignKey("PersonsAtRiskID")]
    [InverseProperty("RiskAssessmentPersonsAtRisks")]
    public virtual PersonsAtRisk? PersonsAtRisk { get; set; }

    [ForeignKey("RiskAssessmentID")]
    [InverseProperty("RiskAssessmentPersonsAtRisks")]
    public virtual RiskAssessment RiskAssessment { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("RiskAssessmentPersonsAtRisks")]
    public virtual UserArea UserArea { get; set; } = null!;
}
