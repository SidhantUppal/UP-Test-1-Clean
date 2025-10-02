using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DistrictViewModel
{
    [Key]
    public int DistrictID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(512)]
    public string Name { get; set; } = null!;

    // Additional Properties
}
