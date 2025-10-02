using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TenantRolePermission", Schema = "V7")]
public partial class TenantRolePermission
{
    [Key]
    public int TenantRolePermissionID { get; set; }

    public int TenantID { get; set; }

    public int PermissionID { get; set; }

    public bool IsGranted { get; set; }

    [ForeignKey("PermissionID")]
    [InverseProperty("TenantRolePermissions")]
    public virtual SystemPermission Permission { get; set; } = null!;

    [ForeignKey("TenantID")]
    [InverseProperty("TenantRolePermissions")]
    public virtual Tenant Tenant { get; set; } = null!;
}
