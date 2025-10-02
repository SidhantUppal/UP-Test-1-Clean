using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaMonitoringConfiguration", Schema = "V7")]
public partial class UserAreaMonitoringConfiguration
{
    [Key]
    public int UserAreaMonitoringConfigurationID { get; set; }

    public int UserAreaID { get; set; }

    public int UserAreaMonitoringSectionID { get; set; }

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaMonitoringConfigurations")]
    public virtual UserArea UserArea { get; set; } = null!;

    [ForeignKey("UserAreaMonitoringSectionID")]
    [InverseProperty("UserAreaMonitoringConfigurations")]
    public virtual UserAreaMonitoringSection UserAreaMonitoringSection { get; set; } = null!;
}
