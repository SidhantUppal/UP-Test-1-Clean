using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HazardReportViewModel
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

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
