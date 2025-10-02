using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TaskScheduleAssignmentViewModel
{
    [Key]
    public int TaskScheduleAssignmentID { get; set; }

    public int TaskScheduleID { get; set; }

    public int? EmployeeID { get; set; }

    public int? LocationID { get; set; }

    public int? OrgGroupID { get; set; }

    // Additional Properties
}
