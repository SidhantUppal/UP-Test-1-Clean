using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("tblMonitoringReport", Schema = "NVQ")]
public partial class tblMonitoringReport
{
    [Key]
    public int ReportId { get; set; }

    public int PortfolioId { get; set; }

    public DateTimeOffset MonitorDate { get; set; }

    public int? MonitoredBy { get; set; }

    [StringLength(50)]
    public string? ReportType { get; set; }

    [StringLength(50)]
    public string? ObservationType { get; set; }

    public string? StrengthsIdentified { get; set; }

    public string? AreasForImprovement { get; set; }

    public string? ActionPlan { get; set; }

    public DateTimeOffset? ActionPlanDueDate { get; set; }

    public bool? IsActionPlanComplete { get; set; }

    [StringLength(20)]
    public string? OverallGrade { get; set; }

    public int? CreatedBy { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public int? ModifiedBy { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    [ForeignKey("PortfolioId")]
    [InverseProperty("tblMonitoringReports")]
    public virtual tblPortfolio Portfolio { get; set; } = null!;
}
