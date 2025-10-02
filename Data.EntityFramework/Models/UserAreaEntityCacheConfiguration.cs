using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserAreaEntityCacheConfiguration", Schema = "V7")]
public partial class UserAreaEntityCacheConfiguration
{
    [Key]
    public int UserAreaEntityCacheConfigurationID { get; set; }

    public int DocumentLinkTableTypeID { get; set; }

    public int? UserAreaID { get; set; }

    public int MaxCacheCount { get; set; }

    [ForeignKey("DocumentLinkTableTypeID")]
    [InverseProperty("UserAreaEntityCacheConfigurations")]
    public virtual DocumentLinkTableType DocumentLinkTableType { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("UserAreaEntityCacheConfigurations")]
    public virtual UserArea? UserArea { get; set; }
}
