using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class tblRangeGroupViewModel
{
    [Key]
    public int RangeGroupId { get; set; }

    [StringLength(100)]
    public string GroupName { get; set; } = null!;

    [StringLength(500)]
    public string? Description { get; set; }

    public bool? IsActive { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    // Additional Properties
}
