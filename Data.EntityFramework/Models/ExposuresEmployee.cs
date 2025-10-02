using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ExposuresEmployee", Schema = "V7")]
[Index("ExposureTypeID", Name = "IX_ExposuresEmployee_ExposureTypeID")]
[Index("ExposureTypeID", "EmployeeID", Name = "IX_ExposuresEmployee_ExposureTypeIDEmployeeID")]
public partial class ExposuresEmployee
{
    [Key]
    public int ExposuresEmployeeID { get; set; }

    public int? ExposureTypeID { get; set; }

    public int? EmployeeID { get; set; }

    public int? UserAreaID { get; set; }

    [ForeignKey("EmployeeID")]
    [InverseProperty("ExposuresEmployees")]
    public virtual Employee? Employee { get; set; }

    [ForeignKey("ExposureTypeID")]
    [InverseProperty("ExposuresEmployees")]
    public virtual ExposureType? ExposureType { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("ExposuresEmployees")]
    public virtual UserArea? UserArea { get; set; }
}
