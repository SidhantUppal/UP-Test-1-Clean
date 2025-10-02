using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TenantPagePermissions", Schema = "V7")]
[Index("PageRoute", Name = "CK_TenantServicePermission_PageRoute", IsUnique = true)]
public partial class TenantPagePermission
{
    [Key]
    public int TenantPagePermissionID { get; set; }

    public int TenantID { get; set; }

    public int TenantRoleID { get; set; }

    [StringLength(255)]
    public string PageRoute { get; set; } = null!;

    [StringLength(50)]
    public string AccessLevel { get; set; } = null!;

    public bool IsGranted { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("TenantID")]
    [InverseProperty("TenantPagePermissions")]
    public virtual Tenant Tenant { get; set; } = null!;

    [ForeignKey("TenantRoleID")]
    [InverseProperty("TenantPagePermissions")]
    public virtual TenantRole TenantRole { get; set; } = null!;
}
