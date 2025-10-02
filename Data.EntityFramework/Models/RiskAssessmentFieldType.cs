using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskAssessmentFieldType", Schema = "V7")]
public partial class RiskAssessmentFieldType
{
    [Key]
    public int RiskAssessmentFieldTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public int RiskAssessmentSectionTypeID { get; set; }

    public int Ident { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string Type { get; set; } = null!;

    public int OrderNum { get; set; }

    public bool IsRequired { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    [StringLength(1000)]
    public string? Options { get; set; }

    public bool IsControlMeasure { get; set; }

    public int? HazardID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("RiskAssessmentFieldTypeArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("RiskAssessmentFieldTypeCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("HazardID")]
    [InverseProperty("RiskAssessmentFieldTypes")]
    public virtual Hazard? Hazard { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("RiskAssessmentFieldTypeModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [InverseProperty("RiskAssessmentFieldType")]
    public virtual ICollection<RiskAssessmentFieldTypeResponse> RiskAssessmentFieldTypeResponses { get; set; } = new List<RiskAssessmentFieldTypeResponse>();

    [InverseProperty("RiskAssessmentFieldType")]
    public virtual ICollection<RiskAssessmentMonitorEventScore> RiskAssessmentMonitorEventScores { get; set; } = new List<RiskAssessmentMonitorEventScore>();

    [ForeignKey("RiskAssessmentSectionTypeID")]
    [InverseProperty("RiskAssessmentFieldTypes")]
    public virtual RiskAssessmentSectionType RiskAssessmentSectionType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("RiskAssessmentFieldTypes")]
    public virtual UserArea? UserArea { get; set; }
}
