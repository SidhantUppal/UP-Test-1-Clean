using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CustomPermission", Schema = "V7")]
public partial class CustomPermission
{
    [Key]
    public int CustomPermissionID { get; set; }

    public int PermissionID { get; set; }

    public int PermissionCategoryTypeID { get; set; }

    public int? UserID { get; set; }

    public int? RoleID { get; set; }

    public int UserAreaID { get; set; }

    public int? CustomPermissionItemID { get; set; }

    public bool PermissionOverrideValue { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("CustomPermissionArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("CustomPermissionCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("CustomPermissionModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("PermissionID")]
    [InverseProperty("CustomPermissions")]
    public virtual Permission Permission { get; set; } = null!;

    [ForeignKey("RoleID")]
    [InverseProperty("CustomPermissions")]
    public virtual Role? Role { get; set; }

    [ForeignKey("UserID")]
    [InverseProperty("CustomPermissionUsers")]
    public virtual User? User { get; set; }
}
