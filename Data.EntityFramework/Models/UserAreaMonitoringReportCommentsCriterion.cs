using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaMonitoringReportCommentsCriteria", Schema = "V7")]
public partial class UserAreaMonitoringReportCommentsCriterion
{
    [Key]
    public int UserAreaMonitoringReportCommentsCriteriaID { get; set; }

    [StringLength(2000)]
    public string? Description { get; set; }

    [InverseProperty("UserAreaMonitoringReportCommentsCriteria")]
    public virtual ICollection<UserAreaMonitoringReportComment> UserAreaMonitoringReportComments { get; set; } = new List<UserAreaMonitoringReportComment>();
}
