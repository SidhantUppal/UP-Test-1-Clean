using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class tblElementViewModel
{
    [Key]
    public int ElementId { get; set; }

    public int UnitId { get; set; }

    [StringLength(20)]
    public string ElementCode { get; set; } = null!;

    [StringLength(200)]
    public string ElementTitle { get; set; } = null!;

    public string? Description { get; set; }

    public int? OrderIndex { get; set; }

    public bool? IsActive { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    // Additional Properties
}
