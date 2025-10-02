using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SCORMPackageUserArea", Schema = "V7")]
[Index("UserAreaID", Name = "IX_SCORMPackageUserArea_UserAreaID_includes")]
public partial class SCORMPackageUserArea
{
    [Key]
    public int SCORMPackageUserAreaID { get; set; }

    public int SCORMPackageID { get; set; }

    public int UserAreaID { get; set; }

    [ForeignKey("SCORMPackageID")]
    [InverseProperty("SCORMPackageUserAreas")]
    public virtual SCORMPackage SCORMPackage { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("SCORMPackageUserAreas")]
    public virtual UserArea UserArea { get; set; } = null!;
}
