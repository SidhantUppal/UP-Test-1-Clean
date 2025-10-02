using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaMonitoringReportCommentViewModel
{
    [Key]
    public int UserAreaMonitoringReportCommentID { get; set; }

    public int? V5UAMRType { get; set; }

    public int? UserAreaMonitoringSectionID { get; set; }

    [StringLength(255)]
    public string? Description { get; set; }

    public int UserAreaMonitoringReportCommentsCriteriaID { get; set; }

    public int LanguageTypeID { get; set; }

    public int RegionTypeID { get; set; }

    // Additional Properties
}
