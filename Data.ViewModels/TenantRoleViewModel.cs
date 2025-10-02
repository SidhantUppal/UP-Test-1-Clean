using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TenantRoleViewModel
{
    [Key]
    public int TenantRoleID { get; set; }

    public int TenantID { get; set; }

    [StringLength(100)]
    public string Name { get; set; } = null!;

    [StringLength(255)]
    public string DisplayName { get; set; } = null!;

    public int? ParentSystemRoleID { get; set; }

    public bool IsCustomRole { get; set; }

    // Additional Properties
}
