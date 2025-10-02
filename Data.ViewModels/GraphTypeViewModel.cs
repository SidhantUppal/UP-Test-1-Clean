using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class GraphTypeViewModel
{
    [Key]
    public int GraphTypeID { get; set; }

    public int GraphBaseTypeID { get; set; }

    public int GraphTabTypeID { get; set; }

    public int ModuleTypeID { get; set; }

    public int OrderNumber { get; set; }

    [StringLength(255)]
    public string? Description { get; set; }

    public bool IsDefaultEnabled { get; set; }

    public bool IsActive { get; set; }

    // Additional Properties
}
