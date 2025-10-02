using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class GraphTabTypeViewModel
{
    [Key]
    public int GraphTabTypeID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    // Additional Properties
}
