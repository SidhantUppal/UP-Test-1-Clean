using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TextBlockOrgGroupViewModel
{
    [Key]
    public int TextBlockOrgGroupID { get; set; }

    public int TextBlockID { get; set; }

    public int OrgGroupID { get; set; }

    // Additional Properties
}
