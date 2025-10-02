using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaRegion", Schema = "V7")]
public partial class UserAreaRegion
{
    [Key]
    public int UserAreaRegionID { get; set; }

    public int UserAreaID { get; set; }

    public int RegionTypeID { get; set; }

    public bool IsDefault { get; set; }

    [ForeignKey("RegionTypeID")]
    [InverseProperty("UserAreaRegions")]
    public virtual RegionType RegionType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaRegions")]
    public virtual UserArea UserArea { get; set; } = null!;
}
