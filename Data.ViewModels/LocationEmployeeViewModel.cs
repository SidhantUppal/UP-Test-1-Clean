using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class LocationEmployeeViewModel
{
    [Key]
    public int LocationEmployeeID { get; set; }

    public int LocationID { get; set; }

    public int EmployeeID { get; set; }

    public bool IsPrimary { get; set; }

    // Additional Properties
}
