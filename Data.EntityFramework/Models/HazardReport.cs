using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("HazardReport", Schema = "V7")]
public partial class HazardReport
{
    [Key]
    public int HazardReportID { get; set; }

    public int? HazardReportTypeID { get; set; }

    public int? LocationID { get; set; }

    public int? TaskID { get; set; }

    public int UserAreaID { get; set; }

    public string Description { get; set; } = null!;

    [StringLength(50)]
    public string? SeverityTitle { get; set; }

    public bool IsReportedAnonymously { get; set; }

    public DateTimeOffset ReportedDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? HazardStatusID { get; set; }

    [StringLength(100)]
    public string? ReporterType { get; set; }

    [StringLength(150)]
    public string? ReporterName { get; set; }

    [StringLength(150)]
    public string? ReporterContactDetails { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("HazardReportArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("HazardReportCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [InverseProperty("HazardReport")]
    public virtual ICollection<HazardReportAttachment> HazardReportAttachments { get; set; } = new List<HazardReportAttachment>();

    [ForeignKey("HazardReportTypeID")]
    [InverseProperty("HazardReports")]
    public virtual HazardReportType? HazardReportType { get; set; }

    [ForeignKey("LocationID")]
    [InverseProperty("HazardReports")]
    public virtual Location? Location { get; set; }

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("HazardReportModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("TaskID")]
    [InverseProperty("HazardReports")]
    public virtual BSSTask? Task { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("HazardReports")]
    public virtual UserArea UserArea { get; set; } = null!;

    [InverseProperty("HazardReport")]
    public virtual ICollection<WalkHazardReport> WalkHazardReports { get; set; } = new List<WalkHazardReport>();
}
