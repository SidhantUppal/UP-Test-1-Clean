using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("Permission", Schema = "V7")]
[Index("ArchivedDate", Name = "IX_ArchivedDate")]
[Index("IsNotArchived", Name = "IX_IsNotArchived")]
[Index("ParentID", Name = "IX_Parent")]
[Index("Key", Name = "IX_Permission_Key")]
[Index("ParentID", Name = "IX_Permission_Parent")]
public partial class Permission
{
    [Key]
    public int PermissionID { get; set; }

    public int? ParentID { get; set; }

    [StringLength(255)]
    public string Description { get; set; } = null!;

    [StringLength(50)]
    public string Key { get; set; } = null!;

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int IsNotArchived { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("Permissions")]
    public virtual User? ArchivedByUser { get; set; }

    [InverseProperty("Permission")]
    public virtual ICollection<CustomPermission> CustomPermissions { get; set; } = new List<CustomPermission>();

    [InverseProperty("Permission")]
    public virtual ICollection<DocumentLinkType> DocumentLinkTypes { get; set; } = new List<DocumentLinkType>();

    [InverseProperty("Parent")]
    public virtual ICollection<Permission> InverseParent { get; set; } = new List<Permission>();

    [InverseProperty("DisplayPermission")]
    public virtual ICollection<ModuleType> ModuleTypeDisplayPermissions { get; set; } = new List<ModuleType>();

    [InverseProperty("RootPermission")]
    public virtual ICollection<ModuleType> ModuleTypeRootPermissions { get; set; } = new List<ModuleType>();

    [ForeignKey("ParentID")]
    [InverseProperty("InverseParent")]
    public virtual Permission? Parent { get; set; }

    [InverseProperty("Permission")]
    public virtual ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();
}
