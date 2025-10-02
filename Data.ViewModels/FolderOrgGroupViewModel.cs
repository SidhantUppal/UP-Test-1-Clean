using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class FolderOrgGroupViewModel
{
    [Key]
    public int FolderOrgGroupID { get; set; }

    public int FolderID { get; set; }

    public int OrgGroupID { get; set; }

    // Additional Properties
}
