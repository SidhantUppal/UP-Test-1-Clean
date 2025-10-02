using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class SystemConfigurationViewModel
{
    [Key]
    public int SystemConfigurationID { get; set; }

    [StringLength(30)]
    public string Name { get; set; } = null!;

    [StringLength(255)]
    public string Description { get; set; } = null!;

    [StringLength(255)]
    public string Value { get; set; } = null!;

    // Additional Properties
}
