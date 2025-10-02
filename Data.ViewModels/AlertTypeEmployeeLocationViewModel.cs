using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AlertTypeEmployeeLocationViewModel
{
    [Key]
    public int AlertTypeEmployeeLocationID { get; set; }

    public int AlertTypeEmployeeID { get; set; }

    public int LocationID { get; set; }

    // Additional Properties
}
