using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("OrgGroupLocation", Schema = "V7")]
[Index("OrgGroupID", "LocationID", Name = "CK_OrgGroupLocation_Unique", IsUnique = true)]
public partial class OrgGroupLocation
{
    [Key]
    public int OrgGroupLocationID { get; set; }

    public int OrgGroupID { get; set; }

    public int LocationID { get; set; }

    public DateTimeOffset? DateTime { get; set; }

    [ForeignKey("LocationID")]
    [InverseProperty("OrgGroupLocations")]
    public virtual Location Location { get; set; } = null!;

    [ForeignKey("OrgGroupID")]
    [InverseProperty("OrgGroupLocations")]
    public virtual OrgGroup OrgGroup { get; set; } = null!;
}
