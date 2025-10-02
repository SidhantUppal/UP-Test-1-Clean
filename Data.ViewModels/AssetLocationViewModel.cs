using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AssetLocationViewModel
{
    [Key]
    public int AssetLocationID { get; set; }

    public int AssetID { get; set; }

    public int LocationID { get; set; }

    // Additional Properties
}
