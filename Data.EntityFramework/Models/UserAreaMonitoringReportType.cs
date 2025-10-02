using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaMonitoringReportType", Schema = "V7")]
public partial class UserAreaMonitoringReportType
{
    [Key]
    public int UserAreaMonitoringReportTypeID { get; set; }

    [StringLength(250)]
    public string Title { get; set; } = null!;

    [StringLength(1000)]
    public string? Description { get; set; }

    [InverseProperty("UserAreaMonitoringReportType")]
    public virtual ICollection<UserAreaMonitoringReport> UserAreaMonitoringReports { get; set; } = new List<UserAreaMonitoringReport>();
}
