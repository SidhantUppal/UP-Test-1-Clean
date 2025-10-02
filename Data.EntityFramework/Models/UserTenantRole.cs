using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserTenantRole", Schema = "V7")]
public partial class UserTenantRole
{
    [Key]
    public int UserTenantRoleID { get; set; }

    public int UserTenantID { get; set; }

    public int TenantRoleID { get; set; }

    public DateTimeOffset AssignedAt { get; set; }

    [ForeignKey("TenantRoleID")]
    [InverseProperty("UserTenantRoles")]
    public virtual TenantRole TenantRole { get; set; } = null!;

    [ForeignKey("UserTenantID")]
    [InverseProperty("UserTenantRoles")]
    public virtual UserTenant UserTenant { get; set; } = null!;
}
