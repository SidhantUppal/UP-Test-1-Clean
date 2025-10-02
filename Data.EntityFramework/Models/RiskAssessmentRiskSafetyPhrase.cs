using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskAssessmentRiskSafetyPhrase", Schema = "V7")]
public partial class RiskAssessmentRiskSafetyPhrase
{
    [Key]
    public int RiskAssessmentRiskSafetyPhraseID { get; set; }

    public int RiskAssessmentID { get; set; }

    public int RiskSafetyPhraseID { get; set; }

    [ForeignKey("RiskAssessmentID")]
    [InverseProperty("RiskAssessmentRiskSafetyPhrases")]
    public virtual RiskAssessment RiskAssessment { get; set; } = null!;

    [ForeignKey("RiskSafetyPhraseID")]
    [InverseProperty("RiskAssessmentRiskSafetyPhrases")]
    public virtual RiskSafetyPhrase RiskSafetyPhrase { get; set; } = null!;
}
