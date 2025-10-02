using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SafeSystemOfWorkLocation", Schema = "V7")]
[Index("SafeSystemOfWorkID", "LocationID", Name = "CK_SafeSystemOfWorkLocation_Unique", IsUnique = true)]
[Index("SafeSystemOfWorkID", Name = "IX_SafeSystemOfWorkLocation_SafeSystemOfWorkID_includes")]
public partial class SafeSystemOfWorkLocation
{
    [Key]
    public int SafeSystemOfWorkLocationID { get; set; }

    public int SafeSystemOfWorkID { get; set; }

    public int LocationID { get; set; }

    [ForeignKey("LocationID")]
    [InverseProperty("SafeSystemOfWorkLocations")]
    public virtual Location Location { get; set; } = null!;

    [ForeignKey("SafeSystemOfWorkID")]
    [InverseProperty("SafeSystemOfWorkLocations")]
    public virtual SafeSystemOfWork SafeSystemOfWork { get; set; } = null!;
}
