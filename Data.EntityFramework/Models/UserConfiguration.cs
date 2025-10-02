using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserConfiguration", Schema = "V7")]
[Index("UserID", "ConfigurationTypeID", Name = "IX_UserConfiguration_IsEnabled")]
public partial class UserConfiguration
{
    [Key]
    public int UserConfigurationID { get; set; }

    public int UserID { get; set; }

    public int ConfigurationTypeID { get; set; }

    public bool IsEnabled { get; set; }

    [ForeignKey("ConfigurationTypeID")]
    [InverseProperty("UserConfigurations")]
    public virtual ConfigurationType ConfigurationType { get; set; } = null!;

    [ForeignKey("UserID")]
    [InverseProperty("UserConfigurations")]
    public virtual User User { get; set; } = null!;
}
