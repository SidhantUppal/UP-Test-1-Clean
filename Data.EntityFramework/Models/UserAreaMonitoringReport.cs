using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaMonitoringReport", Schema = "V7")]
public partial class UserAreaMonitoringReport
{
    [Key]
    public int UserAreaMonitoringReportID { get; set; }

    public int UserAreaID { get; set; }

    [Column(TypeName = "xml")]
    public string XMLReport { get; set; } = null!;

    public DateTimeOffset StartDate { get; set; }

    public DateTimeOffset EndDate { get; set; }

    public int UserAreaMonitoringReportTypeID { get; set; }

    public bool? IsV5GeneratedReport { get; set; }

    public bool HasBeenProcessedByService { get; set; }

    public int MonitoringReportXsltTransformerID { get; set; }

    public int LanguageTypeID { get; set; }

    public int RegionTypeID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("UserAreaMonitoringReportArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("UserAreaMonitoringReportCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("LanguageTypeID")]
    [InverseProperty("UserAreaMonitoringReports")]
    public virtual LanguageType LanguageType { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("UserAreaMonitoringReportModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("MonitoringReportXsltTransformerID")]
    [InverseProperty("UserAreaMonitoringReports")]
    public virtual MonitoringReportXsltTransformer MonitoringReportXsltTransformer { get; set; } = null!;

    [ForeignKey("RegionTypeID")]
    [InverseProperty("UserAreaMonitoringReports")]
    public virtual RegionType RegionType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaMonitoringReports")]
    public virtual UserArea UserArea { get; set; } = null!;

    [ForeignKey("UserAreaMonitoringReportTypeID")]
    [InverseProperty("UserAreaMonitoringReports")]
    public virtual UserAreaMonitoringReportType UserAreaMonitoringReportType { get; set; } = null!;
}
