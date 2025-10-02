using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class tblRangeViewModel
{
    [Key]
    public int RangeId { get; set; }

    public int ElementId { get; set; }

    public int? RangeGroupId { get; set; }

    public string RangeText { get; set; } = null!;

    public int? OrderIndex { get; set; }

    public bool? IsActive { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    // Additional Properties
}
