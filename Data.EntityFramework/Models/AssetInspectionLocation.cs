using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AssetInspectionLocation", Schema = "V7")]
public partial class AssetInspectionLocation
{
    [Key]
    public int AssetInspectionLocationID { get; set; }

    public int AssetInspectionID { get; set; }

    public int LocationID { get; set; }
}
