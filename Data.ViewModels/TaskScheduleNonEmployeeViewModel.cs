using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TaskScheduleNonEmployeeViewModel
{
    [Key]
    public int TaskScheduleNonEmployeeID { get; set; }

    public int TaskScheduleID { get; set; }

    public int? OrgGroupID { get; set; }

    public int? LocationID { get; set; }

    public int? JobRoleID { get; set; }

    // Additional Properties
}
