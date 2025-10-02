using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("RolePermission", Schema = "V7")]
[Index("RoleID", "PermissionID", Name = "IX_RolePermission_RolePermission")]
public partial class RolePermission
{
    [Key]
    public int RolePermissionID { get; set; }

    public int? RoleID { get; set; }

    public int? PermissionID { get; set; }

    public bool Permit { get; set; }

    [ForeignKey("PermissionID")]
    [InverseProperty("RolePermissions")]
    public virtual Permission? Permission { get; set; }

    [ForeignKey("RoleID")]
    [InverseProperty("RolePermissions")]
    public virtual Role? Role { get; set; }
}
