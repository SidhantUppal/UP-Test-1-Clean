using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ControlMeasure", Schema = "V7")]
[Index("ControlMeasureTypeID", Name = "IX_ControlMeasure_Type")]
[Index("UserAreaID", Name = "IX_ControlMeasure_UserAreaID")]
public partial class ControlMeasure
{
    [Key]
    public int ControlMeasureID { get; set; }

    public int UserAreaID { get; set; }

    public int? ControlMeasureTypeID { get; set; }

    [StringLength(255)]
    public string ControlName { get; set; } = null!;

    public string? ControlDescription { get; set; }

    [StringLength(50)]
    public string? ControlCode { get; set; }

    [Column(TypeName = "decimal(3, 1)")]
    public decimal? EffectivenessRating { get; set; }

    [StringLength(50)]
    public string? CostCategory { get; set; }

    [StringLength(50)]
    public string? ImplementationDifficulty { get; set; }

    public string? MaintenanceRequirements { get; set; }

    public string? TrainingRequired { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ControlMeasureTypeID")]
    [InverseProperty("ControlMeasures")]
    public virtual ControlMeasureType? ControlMeasureType { get; set; }

    [InverseProperty("ControlMeasure")]
    public virtual ICollection<HazardControlMeasure> HazardControlMeasures { get; set; } = new List<HazardControlMeasure>();

    [InverseProperty("ControlMeasure")]
    public virtual ICollection<PPEType> PPETypes { get; set; } = new List<PPEType>();

    [InverseProperty("ControlMeasure")]
    public virtual ICollection<RiskAssessmentControlMeasure> RiskAssessmentControlMeasures { get; set; } = new List<RiskAssessmentControlMeasure>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("ControlMeasures")]
    public virtual UserArea UserArea { get; set; } = null!;
}
