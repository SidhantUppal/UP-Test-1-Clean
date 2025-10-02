using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AssetOrgGroup", Schema = "V7")]
public partial class AssetOrgGroup
{
    [Key]
    public int AssetOrgGroupID { get; set; }

    public int AssetID { get; set; }

    public int OrgGroupID { get; set; }
}
