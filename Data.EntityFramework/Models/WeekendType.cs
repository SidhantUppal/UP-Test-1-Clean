using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("WeekendType", Schema = "V7")]
public partial class WeekendType
{
    [Key]
    public int WeekendTypeID { get; set; }

    public int? RegionTypeID { get; set; }

    public int DayOfWeek { get; set; }

    [StringLength(100)]
    public string DayNote { get; set; } = null!;

    [ForeignKey("RegionTypeID")]
    [InverseProperty("WeekendTypes")]
    public virtual RegionType? RegionType { get; set; }
}
