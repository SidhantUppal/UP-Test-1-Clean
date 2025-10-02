using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ResourceLocationViewModel
{
    [Key]
    public int ResourceLocationID { get; set; }

    public int ResourceID { get; set; }

    public int LocationID { get; set; }

    // Additional Properties
}
