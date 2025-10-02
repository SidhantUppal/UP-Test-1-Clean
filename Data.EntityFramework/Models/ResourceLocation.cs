using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ResourceLocation", Schema = "V7")]
[Index("ResourceID", "LocationID", Name = "CK_ResourceLocation_Unique", IsUnique = true)]
[Index("ResourceID", Name = "IX_ResourceLocation_ResourceID_includes")]
public partial class ResourceLocation
{
    [Key]
    public int ResourceLocationID { get; set; }

    public int ResourceID { get; set; }

    public int LocationID { get; set; }

    [ForeignKey("LocationID")]
    [InverseProperty("ResourceLocations")]
    public virtual Location Location { get; set; } = null!;

    [ForeignKey("ResourceID")]
    [InverseProperty("ResourceLocations")]
    public virtual Resource Resource { get; set; } = null!;
}
