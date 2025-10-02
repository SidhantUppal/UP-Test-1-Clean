using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SystemPermission", Schema = "V7")]
[Index("Name", Name = "CK_System_Permission_Name", IsUnique = true)]
public partial class SystemPermission
{
    [Key]
    public int PermissionID { get; set; }

    [StringLength(100)]
    public string Name { get; set; } = null!;

    [StringLength(255)]
    public string DisplayName { get; set; } = null!;

    [StringLength(20)]
    public string? Layer { get; set; }

    [StringLength(50)]
    public string Module { get; set; } = null!;

    [StringLength(500)]
    public string? Description { get; set; }

    [InverseProperty("Permission")]
    public virtual ICollection<SystemRolePermission> SystemRolePermissions { get; set; } = new List<SystemRolePermission>();

    [InverseProperty("Permission")]
    public virtual ICollection<TenantRolePermission> TenantRolePermissions { get; set; } = new List<TenantRolePermission>();
}
