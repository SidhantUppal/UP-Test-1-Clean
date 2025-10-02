using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class SSIPViewModel
{
    [Key]
    public int SSIPID { get; set; }

    [StringLength(100)]
    public string Name { get; set; } = null!;

    [StringLength(100)]
    public string Logo { get; set; } = null!;

    // Additional Properties
}
