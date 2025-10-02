using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaSector", Schema = "V7")]
[Index("UserAreaID", "SectorTypeID", Name = "IX_UserAreaSector_UserArea_SectorType")]
public partial class UserAreaSector
{
    [Key]
    public int UserAreaSectorID { get; set; }

    public int UserAreaID { get; set; }

    public int SectorTypeID { get; set; }

    public bool IsPrimary { get; set; }

    [ForeignKey("SectorTypeID")]
    [InverseProperty("UserAreaSectors")]
    public virtual SectorType SectorType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaSectors")]
    public virtual UserArea UserArea { get; set; } = null!;
}
