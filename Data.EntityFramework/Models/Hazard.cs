using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Hazard", Schema = "V7")]
[Index("HazardCategoryTypeID", Name = "IX_Hazard_CategoryType")]
[Index("UserAreaID", Name = "IX_Hazard_UserAreaID")]
public partial class Hazard
{
    [Key]
    public int HazardID { get; set; }

    [StringLength(255)]
    public string Title { get; set; } = null!;

    [StringLength(50)]
    public string? Reference { get; set; }

    public string? Description { get; set; }

    public int UserAreaID { get; set; }

    public int? HazardCategoryTypeID { get; set; }

    public int? HazardSeverityTypeID { get; set; }

    public int? InherentLikelihood { get; set; }

    public int? InherentConsequence { get; set; }

    public int? InherentRiskScore { get; set; }

    public string? LegalRequirements { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? LocationID { get; set; }

    [StringLength(255)]
    public string? LocationName { get; set; }

    public int? AssignedToUserID { get; set; }

    public int? AssignedToRoleID { get; set; }

    public DateTimeOffset? AssignedDate { get; set; }

    [ForeignKey("AssignedToUserID")]
    [InverseProperty("Hazards")]
    public virtual User? AssignedToUser { get; set; }

    [ForeignKey("HazardCategoryTypeID")]
    [InverseProperty("Hazards")]
    public virtual HazardCategoryType? HazardCategoryType { get; set; }

    [InverseProperty("Hazard")]
    public virtual ICollection<HazardControlMeasure> HazardControlMeasures { get; set; } = new List<HazardControlMeasure>();

    [ForeignKey("HazardSeverityTypeID")]
    [InverseProperty("Hazards")]
    public virtual HazardSeverityType? HazardSeverityType { get; set; }

    [ForeignKey("LocationID")]
    [InverseProperty("Hazards")]
    public virtual Location? Location { get; set; }

    [InverseProperty("Hazard")]
    public virtual ICollection<RiskAssessmentFieldType> RiskAssessmentFieldTypes { get; set; } = new List<RiskAssessmentFieldType>();

    [InverseProperty("Hazard")]
    public virtual ICollection<RiskAssessmentHazard> RiskAssessmentHazards { get; set; } = new List<RiskAssessmentHazard>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("Hazards")]
    public virtual UserArea UserArea { get; set; } = null!;
}
