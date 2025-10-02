using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskAssessmentType", Schema = "V7")]
public partial class RiskAssessmentType
{
    [Key]
    public int RiskAssessmentTypeID { get; set; }

    [StringLength(100)]
    public string TypeName { get; set; } = null!;

    [StringLength(500)]
    public string? TypeDescription { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [InverseProperty("RiskAssessmentType")]
    public virtual ICollection<RiskAssessmentSectionType> RiskAssessmentSectionTypes { get; set; } = new List<RiskAssessmentSectionType>();

    [InverseProperty("RiskAssessmentType")]
    public virtual ICollection<RiskAssessment> RiskAssessments { get; set; } = new List<RiskAssessment>();

    [InverseProperty("RiskAssessmentType")]
    public virtual ICollection<UserAreaRiskAssessmentType> UserAreaRiskAssessmentTypes { get; set; } = new List<UserAreaRiskAssessmentType>();
}
