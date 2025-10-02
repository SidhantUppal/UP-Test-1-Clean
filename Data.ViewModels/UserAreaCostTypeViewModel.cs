using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaCostTypeViewModel
{
    [Key]
    public int UserAreaCostTypeID { get; set; }

    public int UserAreaID { get; set; }

    public int CostTypeID { get; set; }

    public bool IsVisible { get; set; }

    // Additional Properties
}
