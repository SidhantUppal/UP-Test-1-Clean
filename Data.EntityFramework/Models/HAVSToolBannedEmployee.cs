using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HAVSToolBannedEmployee", Schema = "V7")]
public partial class HAVSToolBannedEmployee
{
    [Key]
    public int HAVSToolBannedEmployeeID { get; set; }

    public int UserAreaID { get; set; }

    public int EmployeeID { get; set; }

    public int HAVSToolID { get; set; }

    [ForeignKey("EmployeeID")]
    [InverseProperty("HAVSToolBannedEmployees")]
    public virtual Employee Employee { get; set; } = null!;

    [ForeignKey("HAVSToolID")]
    [InverseProperty("HAVSToolBannedEmployees")]
    public virtual HAVSTool HAVSTool { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("HAVSToolBannedEmployees")]
    public virtual UserArea UserArea { get; set; } = null!;
}
