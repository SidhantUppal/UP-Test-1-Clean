using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ResourceOrgGroupViewModel
{
    [Key]
    public int ResourceOrgGroupID { get; set; }

    public int ResourceID { get; set; }

    public int OrgGroupID { get; set; }

    // Additional Properties
}
