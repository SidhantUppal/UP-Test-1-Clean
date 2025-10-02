using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ExposuresEmployeeViewModel
{
    [Key]
    public int ExposuresEmployeeID { get; set; }

    public int? ExposureTypeID { get; set; }

    public int? EmployeeID { get; set; }

    public int? UserAreaID { get; set; }

    // Additional Properties
}
