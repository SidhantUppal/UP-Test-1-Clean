using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SystemConfiguration", Schema = "V7")]
[Index("Name", Name = "CK_SystemConfiguration_Name", IsUnique = true)]
[Index("Name", Name = "IX_SystemConfiguration_Name_includes")]
public partial class SystemConfiguration
{
    [Key]
    public int SystemConfigurationID { get; set; }

    [StringLength(30)]
    public string Name { get; set; } = null!;

    [StringLength(255)]
    public string Description { get; set; } = null!;

    [StringLength(255)]
    public string Value { get; set; } = null!;
}
