using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class SystemRolePermissionViewModel
{
    [Key]
    public int SystemRoleID { get; set; }

    public int PermissionID { get; set; }

    // Additional Properties
}
