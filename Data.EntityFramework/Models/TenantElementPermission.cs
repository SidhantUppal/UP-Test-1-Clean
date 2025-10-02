using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TenantElementPermissions", Schema = "V7")]
[Index("ElementPattern", Name = "CK_TenantElementPermissions_PageRoute", IsUnique = true)]
public partial class TenantElementPermission
{
    [Key]
    public int TenantElementPermissionID { get; set; }

    public int TenantID { get; set; }

    public int TenantRoleID { get; set; }

    [StringLength(255)]
    public string ElementPattern { get; set; } = null!;

    [StringLength(50)]
    public string PermissionType { get; set; } = null!;

    public bool IsGranted { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("TenantID")]
    [InverseProperty("TenantElementPermissions")]
    public virtual Tenant Tenant { get; set; } = null!;

    [ForeignKey("TenantRoleID")]
    [InverseProperty("TenantElementPermissions")]
    public virtual TenantRole TenantRole { get; set; } = null!;
}
