using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class SubActivityTypeViewModel
{
    [Key]
    public int SubActivityTypeID { get; set; }

    public int MainActivityTypeID { get; set; }

    [StringLength(50)]
    public string Reference { get; set; } = null!;

    [StringLength(100)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    // Additional Properties
}
