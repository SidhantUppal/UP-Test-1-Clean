using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SystemProductType", Schema = "V7")]
public partial class SystemProductType
{
    [Key]
    public int SystemProductTypeID { get; set; }

    [StringLength(50)]
    public string? Reference { get; set; }

    [StringLength(100)]
    public string? Title { get; set; }

    [StringLength(255)]
    public string? Description { get; set; }

    [InverseProperty("SystemProductType")]
    public virtual ICollection<Alert> Alerts { get; set; } = new List<Alert>();

    [InverseProperty("SystemProductType")]
    public virtual ICollection<Event> Events { get; set; } = new List<Event>();

    [InverseProperty("DefaultSystemProductType")]
    public virtual ICollection<ModuleType> ModuleTypes { get; set; } = new List<ModuleType>();

    [InverseProperty("DefaultSystemProductType")]
    public virtual ICollection<Role> Roles { get; set; } = new List<Role>();

    [InverseProperty("SystemProductType")]
    public virtual ICollection<UserAreaSystemProductType> UserAreaSystemProductTypes { get; set; } = new List<UserAreaSystemProductType>();

    [InverseProperty("SystemProductType")]
    public virtual ICollection<UserSystemProductType> UserSystemProductTypes { get; set; } = new List<UserSystemProductType>();
}
