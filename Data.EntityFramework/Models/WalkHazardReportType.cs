using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("WalkHazardReportType", Schema = "V7")]
public partial class WalkHazardReportType
{
    [Key]
    public int WalkHazardReportTypeID { get; set; }

    public int? WalkID { get; set; }

    public int? WalkTemplateID { get; set; }

    public int HazardReportTypeID { get; set; }

    [ForeignKey("HazardReportTypeID")]
    [InverseProperty("WalkHazardReportTypes")]
    public virtual HazardReportType HazardReportType { get; set; } = null!;

    [ForeignKey("WalkID")]
    [InverseProperty("WalkHazardReportTypes")]
    public virtual Walk? Walk { get; set; }

    [ForeignKey("WalkTemplateID")]
    [InverseProperty("WalkHazardReportTypes")]
    public virtual WalkTemplate? WalkTemplate { get; set; }
}
