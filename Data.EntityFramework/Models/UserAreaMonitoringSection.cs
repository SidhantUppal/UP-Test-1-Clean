using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaMonitoringSection", Schema = "V7")]
public partial class UserAreaMonitoringSection
{
    [Key]
    public int UserAreaMonitoringSectionID { get; set; }

    [StringLength(20)]
    public string Reference { get; set; } = null!;

    public bool IsSystemConfigurable { get; set; }

    [StringLength(255)]
    public string? Title { get; set; }

    public string? Description { get; set; }

    [InverseProperty("UserAreaMonitoringSection")]
    public virtual ICollection<UserAreaMonitoringConfiguration> UserAreaMonitoringConfigurations { get; set; } = new List<UserAreaMonitoringConfiguration>();

    [InverseProperty("UserAreaMonitoringSection")]
    public virtual ICollection<UserAreaMonitoringReportComment> UserAreaMonitoringReportComments { get; set; } = new List<UserAreaMonitoringReportComment>();
}
