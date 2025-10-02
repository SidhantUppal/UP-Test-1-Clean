using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TextBlockCategoryTypeViewModel
{
    [Key]
    public int TextBlockCategoryTypeID { get; set; }

    [StringLength(50)]
    public string Reference { get; set; } = null!;

    [StringLength(100)]
    public string? Title { get; set; }

    // Additional Properties
}
