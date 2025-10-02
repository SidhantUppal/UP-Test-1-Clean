using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RolePermissionViewModel
{
    [Key]
    public int RolePermissionID { get; set; }

    public int? RoleID { get; set; }

    public int? PermissionID { get; set; }

    public bool Permit { get; set; }

    // Additional Properties
}
