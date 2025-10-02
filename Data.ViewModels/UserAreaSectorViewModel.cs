using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaSectorViewModel
{
    [Key]
    public int UserAreaSectorID { get; set; }

    public int UserAreaID { get; set; }

    public int SectorTypeID { get; set; }

    public bool IsPrimary { get; set; }

    // Additional Properties
}
