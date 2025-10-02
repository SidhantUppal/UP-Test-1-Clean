using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class OrgGroupLocationViewModel
{
    [Key]
    public int OrgGroupLocationID { get; set; }

    public int OrgGroupID { get; set; }

    public int LocationID { get; set; }

    public DateTimeOffset? DateTime { get; set; }

    // Additional Properties
}
