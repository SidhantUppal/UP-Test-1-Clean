using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ThemeElementPropertyValueViewModel
{
    [Key]
    public int ThemeElementPropertyValueID { get; set; }

    public int ThemeElementPropertyID { get; set; }

    public int ThemeID { get; set; }

    [StringLength(255)]
    public string PropertyValue { get; set; } = null!;

    // Additional Properties
}
