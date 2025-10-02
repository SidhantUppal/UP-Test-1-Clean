using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TextBlockStatusTypeViewModel
{
    [Key]
    public int TextBlockStatusTypeID { get; set; }

    public bool IsVisible { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    // Additional Properties
}
