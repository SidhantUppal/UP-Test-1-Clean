using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ComplianceScoreType", Schema = "V7")]
public partial class ComplianceScoreType
{
    [Key]
    public int ComplianceScoreTypeID { get; set; }

    [StringLength(20)]
    [Unicode(false)]
    public string? Reference { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    [InverseProperty("ComplianceScoreType")]
    public virtual ICollection<ComplianceScoreLabelType> ComplianceScoreLabelTypes { get; set; } = new List<ComplianceScoreLabelType>();

    [InverseProperty("DefaultComplianceScoreType")]
    public virtual ICollection<UserAreaRiskAssessmentSetting> UserAreaRiskAssessmentSettings { get; set; } = new List<UserAreaRiskAssessmentSetting>();
}
