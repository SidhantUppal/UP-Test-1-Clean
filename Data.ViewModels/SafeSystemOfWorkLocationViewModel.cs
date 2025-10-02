using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class SafeSystemOfWorkLocationViewModel
{
    [Key]
    public int SafeSystemOfWorkLocationID { get; set; }

    public int SafeSystemOfWorkID { get; set; }

    public int LocationID { get; set; }

    // Additional Properties
}
