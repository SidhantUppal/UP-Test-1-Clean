using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RegionType", Schema = "V7")]
public partial class RegionType
{
    [Key]
    public int RegionTypeID { get; set; }

    [StringLength(50)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    [StringLength(10)]
    public string? Code { get; set; }

    [InverseProperty("RegionType")]
    public virtual ICollection<BankHolidayType> BankHolidayTypes { get; set; } = new List<BankHolidayType>();

    [InverseProperty("RegionType")]
    public virtual ICollection<MonitoringReportXsltTransformer> MonitoringReportXsltTransformers { get; set; } = new List<MonitoringReportXsltTransformer>();

    [InverseProperty("RegionType")]
    public virtual ICollection<UserAreaMonitoringReportComment> UserAreaMonitoringReportComments { get; set; } = new List<UserAreaMonitoringReportComment>();

    [InverseProperty("RegionType")]
    public virtual ICollection<UserAreaMonitoringReport> UserAreaMonitoringReports { get; set; } = new List<UserAreaMonitoringReport>();

    [InverseProperty("RegionType")]
    public virtual ICollection<UserAreaRegion> UserAreaRegions { get; set; } = new List<UserAreaRegion>();

    [InverseProperty("RegionType")]
    public virtual ICollection<WeekendType> WeekendTypes { get; set; } = new List<WeekendType>();
}
