using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ControlMeasureViewModel
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

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
