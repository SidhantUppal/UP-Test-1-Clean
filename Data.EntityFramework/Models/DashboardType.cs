using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("DashboardType", Schema = "V7")]
public partial class DashboardType
{
    [Key]
    public int DashboardTypeID { get; set; }

    [StringLength(20)]
    public string Reference { get; set; } = null!;

    [StringLength(100)]
    public string? Title { get; set; }
}
