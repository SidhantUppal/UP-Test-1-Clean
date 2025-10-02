using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("LanguageType", Schema = "V7")]
public partial class LanguageType
{
    [Key]
    public int LanguageTypeID { get; set; }

    public int? UserAreaID { get; set; }

    [StringLength(50)]
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    [StringLength(10)]
    public string Code { get; set; } = null!;

    public int DefaultRegionTypeID { get; set; }

    [InverseProperty("LanguageType")]
    public virtual ICollection<MonitoringReportXsltTransformer> MonitoringReportXsltTransformers { get; set; } = new List<MonitoringReportXsltTransformer>();

    [ForeignKey("UserAreaID")]
    [InverseProperty("LanguageTypes")]
    public virtual UserArea? UserArea { get; set; }

    [InverseProperty("LanguageType")]
    public virtual ICollection<UserAreaLanguage> UserAreaLanguages { get; set; } = new List<UserAreaLanguage>();

    [InverseProperty("LanguageType")]
    public virtual ICollection<UserAreaMonitoringReportComment> UserAreaMonitoringReportComments { get; set; } = new List<UserAreaMonitoringReportComment>();

    [InverseProperty("LanguageType")]
    public virtual ICollection<UserAreaMonitoringReport> UserAreaMonitoringReports { get; set; } = new List<UserAreaMonitoringReport>();
}
