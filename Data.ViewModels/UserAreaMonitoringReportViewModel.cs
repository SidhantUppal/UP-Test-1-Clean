using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaMonitoringReportViewModel
{
    [Key]
    public int UserAreaMonitoringReportID { get; set; }

    public int UserAreaID { get; set; }

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

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
