using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class tblUnitViewModel
{
    [Key]
    public int UnitId { get; set; }

    [StringLength(20)]
    public string UnitCode { get; set; } = null!;

    [StringLength(200)]
    public string UnitTitle { get; set; } = null!;

    public int? UnitLevel { get; set; }

    public int? Credits { get; set; }

    public int? GLH { get; set; }

    public string? Description { get; set; }

    public bool? IsCore { get; set; }

    public bool? IsActive { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    // Additional Properties
}
