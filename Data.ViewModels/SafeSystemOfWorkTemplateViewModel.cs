using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class SafeSystemOfWorkTemplateViewModel
{
    [Key]
    public int SafeSystemOfWorkTemplateID { get; set; }

    public int SafeSystemOfWorkTypeID { get; set; }

    [StringLength(20)]
    public string? Reference { get; set; }

    public int? UserAreaID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public int? ArchivedByUserID { get; set; }

    public bool IncludePPEOptions { get; set; }

    public bool IncludeRiskAssessmentOptions { get; set; }

    public bool IncludeSSOWLinks { get; set; }

    public bool IncludeAdvancedDetails { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
