using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SystemRolePermission", Schema = "V7")]
public partial class SystemRolePermission
{
    [Key]
    public int SystemRoleID { get; set; }

    public int PermissionID { get; set; }

    [ForeignKey("PermissionID")]
    [InverseProperty("SystemRolePermissions")]
    public virtual SystemPermission Permission { get; set; } = null!;
}
