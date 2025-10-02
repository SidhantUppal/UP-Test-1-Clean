using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class tblAssessmentDiaryLogTypeViewModel
{
    [Key]
    public int LogTypeId { get; set; }

    [StringLength(50)]
    public string LogTypeName { get; set; } = null!;

    [StringLength(200)]
    public string? Description { get; set; }

    public bool? IsActive { get; set; }

    // Additional Properties
}
