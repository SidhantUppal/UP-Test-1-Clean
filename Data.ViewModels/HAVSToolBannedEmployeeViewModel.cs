using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HAVSToolBannedEmployeeViewModel
{
    [Key]
    public int HAVSToolBannedEmployeeID { get; set; }

    public int UserAreaID { get; set; }

    public int EmployeeID { get; set; }

    public int HAVSToolID { get; set; }

    // Additional Properties
}
