using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class SystemRoleViewModel
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

    // Additional Properties
}
