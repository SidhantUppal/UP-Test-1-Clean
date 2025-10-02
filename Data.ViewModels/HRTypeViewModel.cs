using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HRTypeViewModel
{
    [Key]
    public int HRTypeID { get; set; }

    [StringLength(50)]
    public string Name { get; set; } = null!;

    [StringLength(100)]
    public string? Title { get; set; }

    // Additional Properties
}
