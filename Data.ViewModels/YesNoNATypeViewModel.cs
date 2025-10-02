using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class YesNoNATypeViewModel
{
    [Key]
    public int YesNoNATypeID { get; set; }

    [StringLength(20)]
    public string Name { get; set; } = null!;

    // Additional Properties
}
