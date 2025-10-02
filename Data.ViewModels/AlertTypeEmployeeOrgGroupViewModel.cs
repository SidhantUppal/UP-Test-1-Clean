using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AlertTypeEmployeeOrgGroupViewModel
{
    [Key]
    public int AlertTypeEmployeeOrgGroupID { get; set; }

    public int AlertTypeEmployeeID { get; set; }

    public int OrgGroupID { get; set; }

    // Additional Properties
}
