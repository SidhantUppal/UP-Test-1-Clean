using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TaskScheduleOrgGroupViewModel
{
    [Key]
    public int TaskScheduleOrgGroupID { get; set; }

    public int TaskScheduleID { get; set; }

    public int OrgGroupID { get; set; }

    // Additional Properties
}
