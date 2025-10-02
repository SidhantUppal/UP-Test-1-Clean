using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaMonitoringReportComment", Schema = "V7")]
public partial class UserAreaMonitoringReportComment
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

    [ForeignKey("LanguageTypeID")]
    [InverseProperty("UserAreaMonitoringReportComments")]
    public virtual LanguageType LanguageType { get; set; } = null!;

    [ForeignKey("RegionTypeID")]
    [InverseProperty("UserAreaMonitoringReportComments")]
    public virtual RegionType RegionType { get; set; } = null!;

    [ForeignKey("UserAreaMonitoringReportCommentsCriteriaID")]
    [InverseProperty("UserAreaMonitoringReportComments")]
    public virtual UserAreaMonitoringReportCommentsCriterion UserAreaMonitoringReportCommentsCriteria { get; set; } = null!;

    [ForeignKey("UserAreaMonitoringSectionID")]
    [InverseProperty("UserAreaMonitoringReportComments")]
    public virtual UserAreaMonitoringSection? UserAreaMonitoringSection { get; set; }
}
