using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ConfigurationTypeViewModel
{
    [Key]
    public int ConfigurationTypeID { get; set; }

    [StringLength(50)]
    public string Name { get; set; } = null!;

    [StringLength(150)]
    public string? Description { get; set; }

    // Additional Properties
}
