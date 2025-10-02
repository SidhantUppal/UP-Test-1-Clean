using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskAssessmentHazardCategoryType", Schema = "V7")]
public partial class RiskAssessmentHazardCategoryType
{
    [Key]
    public int RiskAssessmentHazardCategoryTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public int RiskAssessmentID { get; set; }

    public int HazardCategoryTypeID { get; set; }

    public bool HasSharedRiskLevel { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("RiskAssessmentHazardCategoryTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("RiskAssessmentHazardCategoryTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("HazardCategoryTypeID")]
    [InverseProperty("RiskAssessmentHazardCategoryTypes")]
    public virtual HazardCategoryType HazardCategoryType { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("RiskAssessmentHazardCategoryTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("RiskAssessmentID")]
    [InverseProperty("RiskAssessmentHazardCategoryTypes")]
    public virtual RiskAssessment RiskAssessment { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("RiskAssessmentHazardCategoryTypes")]
    public virtual UserArea? UserArea { get; set; }
}
