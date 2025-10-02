using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("LocationEmployee", Schema = "V7")]
[Index("LocationID", "EmployeeID", Name = "CK_LocationEmployee_Unique", IsUnique = true)]
[Index("EmployeeID", Name = "IX_LocationEmployee_EmployeeID")]
[Index("LocationID", Name = "IX_LocationEmployee_LocationID")]
public partial class LocationEmployee
{
    [Key]
    public int LocationEmployeeID { get; set; }

    public int LocationID { get; set; }

    public int EmployeeID { get; set; }

    public bool IsPrimary { get; set; }

    [ForeignKey("EmployeeID")]
    [InverseProperty("LocationEmployees")]
    public virtual Employee Employee { get; set; } = null!;

    [ForeignKey("LocationID")]
    [InverseProperty("LocationEmployees")]
    public virtual Location Location { get; set; } = null!;
}
