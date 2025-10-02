using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class OrgGroupEmployeeViewModel
{
    [Key]
    public int OrgGroupEmployeeID { get; set; }

    public int OrgGroupID { get; set; }

    public int EmployeeID { get; set; }

    // Additional Properties
}
