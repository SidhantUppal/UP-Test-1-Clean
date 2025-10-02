using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RegionTypeViewModel
{
    [Key]
    public int RegionTypeID { get; set; }

    [StringLength(50)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    [StringLength(10)]
    public string? Code { get; set; }

    // Additional Properties
}
