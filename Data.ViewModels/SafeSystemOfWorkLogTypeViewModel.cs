using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class SafeSystemOfWorkLogTypeViewModel
{
    [Key]
    public int SafeSystemOfWorkLogTypeID { get; set; }

    [StringLength(20)]
    public string? Reference { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    // Additional Properties
}
