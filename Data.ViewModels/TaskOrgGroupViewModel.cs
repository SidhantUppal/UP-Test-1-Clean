using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TaskOrgGroupViewModel
{
    [Key]
    public int TaskOrgGroupID { get; set; }

    public int TaskID { get; set; }

    public int OrgGroupID { get; set; }

    // Additional Properties
}
