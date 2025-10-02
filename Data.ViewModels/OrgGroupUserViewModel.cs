using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class OrgGroupUserViewModel
{
    [Key]
    public int OrgGroupUserID { get; set; }

    public int OrgGroupID { get; set; }

    public int UserID { get; set; }

    // Additional Properties
}
