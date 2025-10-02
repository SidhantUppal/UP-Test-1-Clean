using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AssetOrgGroupViewModel
{
    [Key]
    public int AssetOrgGroupID { get; set; }

    public int AssetID { get; set; }

    public int OrgGroupID { get; set; }

    // Additional Properties
}
