using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AssetLocation", Schema = "V7")]
public partial class AssetLocation
{
    [Key]
    public int AssetLocationID { get; set; }

    public int AssetID { get; set; }

    public int LocationID { get; set; }
}
