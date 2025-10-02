using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TaskNonEmployeeViewModel
{
    [Key]
    public int TaskNonEmployeeID { get; set; }

    public int TaskID { get; set; }

    public int? OrgGroupID { get; set; }

    public int? LocationID { get; set; }

    public int? JobRoleID { get; set; }

    // Additional Properties
}
