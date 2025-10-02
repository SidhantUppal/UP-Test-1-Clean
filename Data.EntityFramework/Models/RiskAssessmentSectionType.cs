using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RiskAssessmentSectionType", Schema = "V7")]
public partial class RiskAssessmentSectionType
{
    [Key]
    public int RiskAssessmentSectionTypeID { get; set; }

    public int RiskAssessmentTypeID { get; set; }

    [Column(TypeName = "decimal(4, 1)")]
    public decimal Version { get; set; }

    public int OrderNum { get; set; }

    public bool IsHidden { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    [StringLength(255)]
    public string? Notes { get; set; }

    [InverseProperty("RiskAssessmentSectionType")]
    public virtual ICollection<RiskAssessmentFieldType> RiskAssessmentFieldTypes { get; set; } = new List<RiskAssessmentFieldType>();

    [ForeignKey("RiskAssessmentTypeID")]
    [InverseProperty("RiskAssessmentSectionTypes")]
    public virtual RiskAssessmentType RiskAssessmentType { get; set; } = null!;
}
