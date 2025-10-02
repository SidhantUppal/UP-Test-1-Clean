using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class tblQualificationUnitViewModel
{
    [Key]
    public int Id { get; set; }

    public int QualificationId { get; set; }

    public int UnitId { get; set; }

    public bool? IsMandatory { get; set; }

    [StringLength(100)]
    public string? GroupName { get; set; }

    public int? MinGroupUnits { get; set; }

    // Additional Properties
}
