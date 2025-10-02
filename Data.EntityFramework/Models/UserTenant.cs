using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("UserTenant", Schema = "V7")]
public partial class UserTenant
{
    [Key]
    public int UserTenantID { get; set; }

    public int UserID { get; set; }

    public int TenantID { get; set; }

    [StringLength(20)]
    public string? Status { get; set; }

    [ForeignKey("TenantID")]
    [InverseProperty("UserTenants")]
    public virtual Tenant Tenant { get; set; } = null!;

    [ForeignKey("UserID")]
    [InverseProperty("UserTenants")]
    public virtual User User { get; set; } = null!;

    [InverseProperty("UserTenant")]
    public virtual ICollection<UserTenantRole> UserTenantRoles { get; set; } = new List<UserTenantRole>();
}
