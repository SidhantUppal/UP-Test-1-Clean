using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ChecklistOrgGroupViewModel
{
    [Key]
    public int ChecklistOrgGroupID { get; set; }

    public int ChecklistID { get; set; }

    public int OrgGroupID { get; set; }

    // Additional Properties
}
