using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("AlertTypeEmployeeLocation", Schema = "V7")]
[Index("AlertTypeEmployeeID", Name = "IX_AlertTypeEmployeeLocation_AlertTypeEmployee")]
public partial class AlertTypeEmployeeLocation
{
    [Key]
    public int AlertTypeEmployeeLocationID { get; set; }

    public int AlertTypeEmployeeID { get; set; }

    public int LocationID { get; set; }

    [ForeignKey("AlertTypeEmployeeID")]
    [InverseProperty("AlertTypeEmployeeLocations")]
    public virtual AlertTypeEmployee AlertTypeEmployee { get; set; } = null!;

    [ForeignKey("LocationID")]
    [InverseProperty("AlertTypeEmployeeLocations")]
    public virtual Location Location { get; set; } = null!;
}
