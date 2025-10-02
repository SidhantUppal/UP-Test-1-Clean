using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ConfigurationType", Schema = "V7")]
public partial class ConfigurationType
{
    [Key]
    public int ConfigurationTypeID { get; set; }

    [StringLength(50)]
    public string Name { get; set; } = null!;

    [StringLength(150)]
    public string? Description { get; set; }

    [InverseProperty("ConfigurationType")]
    public virtual ICollection<UserAreaConfiguration> UserAreaConfigurations { get; set; } = new List<UserAreaConfiguration>();

    [InverseProperty("ConfigurationType")]
    public virtual ICollection<UserConfiguration> UserConfigurations { get; set; } = new List<UserConfiguration>();
}
