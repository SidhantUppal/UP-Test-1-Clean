using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserTenantRoleViewModel
{
    [Key]
    public int UserTenantRoleID { get; set; }

    public int UserTenantID { get; set; }

    public int TenantRoleID { get; set; }

    public DateTimeOffset AssignedAt { get; set; }

    // Additional Properties
}
