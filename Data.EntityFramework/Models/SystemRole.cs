using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SystemRole", Schema = "V7")]
[Index("Name", Name = "CK_SystemRole_Name", IsUnique = true)]
public partial class SystemRole
{
    [Key]
    public int RoleID { get; set; }

    [StringLength(100)]
    public string Name { get; set; } = null!;

    [StringLength(255)]
    public string DisplayName { get; set; } = null!;

    [StringLength(50)]
    public string Category { get; set; } = null!;

    public bool IsSystemRole { get; set; }
}
