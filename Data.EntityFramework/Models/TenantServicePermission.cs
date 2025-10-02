using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TenantServicePermission", Schema = "V7")]
[Index("ServiceName", Name = "CK_TenantServicePermission_Name", IsUnique = true)]
public partial class TenantServicePermission
{
    [Key]
    public int TenantServicePermissionID { get; set; }

    public int TenantID { get; set; }

    [StringLength(100)]
    public string ServiceName { get; set; } = null!;

    public bool IsEnabled { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    [ForeignKey("TenantID")]
    [InverseProperty("TenantServicePermissions")]
    public virtual Tenant Tenant { get; set; } = null!;
}
