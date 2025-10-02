using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HazardReportType", Schema = "V7")]
public partial class HazardReportType
{
    [Key]
    public int HazardReportTypeID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    [InverseProperty("HazardReportType")]
    public virtual ICollection<HazardReport> HazardReports { get; set; } = new List<HazardReport>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("HazardReportTypes")]
    public virtual UserArea? UserArea { get; set; }

    [InverseProperty("HazardReportType")]
    public virtual ICollection<WalkHazardReportType> WalkHazardReportTypes { get; set; } = new List<WalkHazardReportType>();
}
