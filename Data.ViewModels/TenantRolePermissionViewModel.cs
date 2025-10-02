using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TenantRolePermissionViewModel
{
    [Key]
    public int TenantRolePermissionID { get; set; }

    public int TenantID { get; set; }

    public int PermissionID { get; set; }

    public bool IsGranted { get; set; }

    // Additional Properties
}
