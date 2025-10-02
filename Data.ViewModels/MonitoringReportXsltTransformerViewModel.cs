using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class MonitoringReportXsltTransformerViewModel
{
    [Key]
    public int MonitoringReportXsltTransformerID { get; set; }

    public int XsltTransformerTypeID { get; set; }

    [StringLength(250)]
    public string Title { get; set; } = null!;

    public int RegionTypeID { get; set; }

    public int LanguageTypeID { get; set; }

    public string Xslt { get; set; } = null!;

    [StringLength(10)]
    public string Version { get; set; } = null!;

    public bool IsActive { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
}
