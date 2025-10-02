using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ThemeElementPropertyViewModel
{
    [Key]
    public int ThemeElementPropertyID { get; set; }

    public int ThemeElementID { get; set; }

    [StringLength(255)]
    public string DisplayName { get; set; } = null!;

    [StringLength(255)]
    public string CssProperty { get; set; } = null!;

    // Additional Properties
}
