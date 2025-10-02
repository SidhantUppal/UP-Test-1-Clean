using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskMatrixType", Schema = "V7")]
public partial class RiskMatrixType
{
    [Key]
    public int RiskMatrixTypeID { get; set; }

    [StringLength(100)]
    public string MatrixName { get; set; } = null!;

    [StringLength(500)]
    public string? MatrixDescription { get; set; }

    public int? LikelihoodLevels { get; set; }

    public int? ConsequenceLevels { get; set; }

    public bool? IsDefault { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("RiskMatrixType")]
    public virtual ICollection<RiskAssessment> RiskAssessments { get; set; } = new List<RiskAssessment>();

    [InverseProperty("RiskMatrixType")]
    public virtual ICollection<RiskMatrixConsequenceType> RiskMatrixConsequenceTypes { get; set; } = new List<RiskMatrixConsequenceType>();

    [InverseProperty("RiskMatrixType")]
    public virtual ICollection<RiskMatrixLikelihoodType> RiskMatrixLikelihoodTypes { get; set; } = new List<RiskMatrixLikelihoodType>();

    [InverseProperty("RiskMatrixType")]
    public virtual ICollection<RiskMatrixTypeColour> RiskMatrixTypeColours { get; set; } = new List<RiskMatrixTypeColour>();

    [InverseProperty("DefaultRiskMatrixType")]
    public virtual ICollection<UserAreaRiskAssessmentSetting> UserAreaRiskAssessmentSettings { get; set; } = new List<UserAreaRiskAssessmentSetting>();
}
