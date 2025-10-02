using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ElementTypeViewModel
{
    [Key]
    public int ElementTypeID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    public bool? IsQuestion { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    // Additional Properties
}
