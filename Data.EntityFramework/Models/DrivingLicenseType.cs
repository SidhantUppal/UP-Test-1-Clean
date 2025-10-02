using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DrivingLicenseType", Schema = "V7")]
public partial class DrivingLicenseType
{
    [Key]
    public int DrivingLicenseTypeID { get; set; }

    [StringLength(20)]
    [Unicode(false)]
    public string? Reference { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    public string? Description { get; set; }
}
