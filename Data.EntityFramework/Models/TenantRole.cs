using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TenantRole", Schema = "V7")]
[Index("Name", Name = "CK_TenantRole_Name", IsUnique = true)]
[Index("TenantID", "Name", Name = "UQ__TenantRo__49AC1FCFAC13A4C1", IsUnique = true)]
public partial class TenantRole
{
    [Key]
    public int TenantRoleID { get; set; }

    public int TenantID { get; set; }

    [StringLength(100)]
    public string Name { get; set; } = null!;

    [StringLength(255)]
    public string DisplayName { get; set; } = null!;

    public int? ParentSystemRoleID { get; set; }

    public bool IsCustomRole { get; set; }

    [ForeignKey("TenantID")]
    [InverseProperty("TenantRoles")]
    public virtual Tenant Tenant { get; set; } = null!;

    [InverseProperty("TenantRole")]
    public virtual ICollection<TenantElementPermission> TenantElementPermissions { get; set; } = new List<TenantElementPermission>();

    [InverseProperty("TenantRole")]
    public virtual ICollection<TenantPagePermission> TenantPagePermissions { get; set; } = new List<TenantPagePermission>();

    [InverseProperty("TenantRole")]
    public virtual ICollection<UserTenantRole> UserTenantRoles { get; set; } = new List<UserTenantRole>();
}
