using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ThemeElementViewModel
{
    [Key]
    public int ThemeElementID { get; set; }

    [StringLength(255)]
    public string DisplayName { get; set; } = null!;

    public string CssElement { get; set; } = null!;

    // Additional Properties
}
