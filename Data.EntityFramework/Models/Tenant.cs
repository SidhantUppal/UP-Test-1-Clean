using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Tenant", Schema = "V7")]
[Index("Name", Name = "CK_Tenants_Name", IsUnique = true)]
public partial class Tenant
{
    [Key]
    public int TenantID { get; set; }

    [StringLength(255)]
    public string Name { get; set; } = null!;

    [StringLength(255)]
    public string AzureADTenantID { get; set; } = null!;

    [StringLength(20)]
    public string Status { get; set; } = null!;

    [InverseProperty("Tenant")]
    public virtual ICollection<TenantElementPermission> TenantElementPermissions { get; set; } = new List<TenantElementPermission>();

    [InverseProperty("Tenant")]
    public virtual ICollection<TenantPagePermission> TenantPagePermissions { get; set; } = new List<TenantPagePermission>();

    [InverseProperty("Tenant")]
    public virtual ICollection<TenantRolePermission> TenantRolePermissions { get; set; } = new List<TenantRolePermission>();

    [InverseProperty("Tenant")]
    public virtual ICollection<TenantRole> TenantRoles { get; set; } = new List<TenantRole>();

    [InverseProperty("Tenant")]
    public virtual ICollection<TenantServicePermission> TenantServicePermissions { get; set; } = new List<TenantServicePermission>();

    [InverseProperty("Tenant")]
    public virtual ICollection<UserTenant> UserTenants { get; set; } = new List<UserTenant>();
}
