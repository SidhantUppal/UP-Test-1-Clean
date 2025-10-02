using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaMonitoringReportCommentsCriterionViewModel
{
    [Key]
    public int UserAreaMonitoringReportCommentsCriteriaID { get; set; }

    [StringLength(2000)]
    public string? Description { get; set; }

    // Additional Properties
}
