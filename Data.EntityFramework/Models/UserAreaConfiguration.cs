using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaConfiguration", Schema = "V7")]
[Index("UserAreaID", "ConfigurationTypeID", Name = "IX_UserAreaConfiguration_IsEnabled")]
public partial class UserAreaConfiguration
{
    [Key]
    public int UserAreaConfigurationID { get; set; }

    public int UserAreaID { get; set; }

    public int ConfigurationTypeID { get; set; }

    public bool IsEnabled { get; set; }

    [ForeignKey("ConfigurationTypeID")]
    [InverseProperty("UserAreaConfigurations")]
    public virtual ConfigurationType ConfigurationType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaConfigurations")]
    public virtual UserArea UserArea { get; set; } = null!;
}
