using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HAVSToolApplicableEmployee", Schema = "V7")]
public partial class HAVSToolApplicableEmployee
{
    [Key]
    public int HAVSToolApplicableEmployeeID { get; set; }

    public int UserAreaID { get; set; }

    public int EmployeeID { get; set; }

    public int HAVSToolID { get; set; }

    public int? DailyLimitHours { get; set; }

    public int? DailyLimitMinutes { get; set; }

    public bool IsProhibited { get; set; }

    [ForeignKey("EmployeeID")]
    [InverseProperty("HAVSToolApplicableEmployees")]
    public virtual Employee Employee { get; set; } = null!;

    [ForeignKey("HAVSToolID")]
    [InverseProperty("HAVSToolApplicableEmployees")]
    public virtual HAVSTool HAVSTool { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("HAVSToolApplicableEmployees")]
    public virtual UserArea UserArea { get; set; } = null!;
}
