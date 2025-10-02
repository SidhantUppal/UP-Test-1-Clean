using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class JobRoleEmployeeViewModel
{
    [Key]
    public int JobRoleEmployeeID { get; set; }

    public int JobRoleID { get; set; }

    public int EmployeeID { get; set; }

    // Additional Properties
}
