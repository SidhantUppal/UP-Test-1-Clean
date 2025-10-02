using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("WalkHazardReport", Schema = "V7")]
public partial class WalkHazardReport
{
    [Key]
    public int WalkHazardReportID { get; set; }

    public int HazardReportID { get; set; }

    public int WalkResponseID { get; set; }

    public int? WalkCheckpointID { get; set; }

    [ForeignKey("HazardReportID")]
    [InverseProperty("WalkHazardReports")]
    public virtual HazardReport HazardReport { get; set; } = null!;

    [ForeignKey("WalkCheckpointID")]
    [InverseProperty("WalkHazardReports")]
    public virtual WalkCheckpoint? WalkCheckpoint { get; set; }

    [ForeignKey("WalkResponseID")]
    [InverseProperty("WalkHazardReports")]
    public virtual WalkResponse WalkResponse { get; set; } = null!;
}
