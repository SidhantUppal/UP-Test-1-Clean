using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("MonitoringReportXsltTransformer", Schema = "V7")]
public partial class MonitoringReportXsltTransformer
{
    [Key]
    public int MonitoringReportXsltTransformerID { get; set; }

    public int XsltTransformerTypeID { get; set; }

    [StringLength(250)]
    public string Title { get; set; } = null!;

    public int RegionTypeID { get; set; }

    public int LanguageTypeID { get; set; }

    [Column(TypeName = "xml")]
    public string Xslt { get; set; } = null!;

    [StringLength(10)]
    [Unicode(false)]
    public string Version { get; set; } = null!;

    public bool IsActive { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("LanguageTypeID")]
    [InverseProperty("MonitoringReportXsltTransformers")]
    public virtual LanguageType LanguageType { get; set; } = null!;

    [ForeignKey("RegionTypeID")]
    [InverseProperty("MonitoringReportXsltTransformers")]
    public virtual RegionType RegionType { get; set; } = null!;

    [InverseProperty("MonitoringReportXsltTransformer")]
    public virtual ICollection<UserAreaMonitoringReport> UserAreaMonitoringReports { get; set; } = new List<UserAreaMonitoringReport>();

    [ForeignKey("XsltTransformerTypeID")]
    [InverseProperty("MonitoringReportXsltTransformers")]
    public virtual XsltTransformerType XsltTransformerType { get; set; } = null!;
}
