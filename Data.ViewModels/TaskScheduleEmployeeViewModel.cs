using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TaskScheduleEmployeeViewModel
{
    [Key]
    public int TaskScheduleEmployeeID { get; set; }

    public int TaskScheduleID { get; set; }

    public int EmployeeID { get; set; }

    // Additional Properties
}
