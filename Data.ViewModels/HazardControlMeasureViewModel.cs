using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HazardControlMeasureViewModel
{
    [Key]
    public int HazardControlMeasureID { get; set; }

    public int HazardID { get; set; }

    public int ControlMeasureID { get; set; }

    // Additional Properties
}
