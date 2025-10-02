using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class SystemPermissionViewModel
{
    [Key]
    public int PermissionID { get; set; }

    [StringLength(100)]
    public string Name { get; set; } = null!;

    [StringLength(255)]
    public string DisplayName { get; set; } = null!;

    [StringLength(20)]
    public string? Layer { get; set; }

    [StringLength(50)]
    public string Module { get; set; } = null!;

    [StringLength(500)]
    public string? Description { get; set; }

    // Additional Properties
}
