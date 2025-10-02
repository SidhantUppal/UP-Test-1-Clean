using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaRegionViewModel
{
    [Key]
    public int UserAreaRegionID { get; set; }

    public int UserAreaID { get; set; }

    public int RegionTypeID { get; set; }

    public bool IsDefault { get; set; }

    // Additional Properties
}
