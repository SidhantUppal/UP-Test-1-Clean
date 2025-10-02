using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ReferrerStatusTypeViewModel
{
    [Key]
    public int ReferrerStatusTypeID { get; set; }

    [StringLength(150)]
    public string Name { get; set; } = null!;

    // Additional Properties
}
