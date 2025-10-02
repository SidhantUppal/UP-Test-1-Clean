using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TenantElementPermissionViewModel
{
    [Key]
    public int TenantElementPermissionID { get; set; }

    public int TenantID { get; set; }

    public int TenantRoleID { get; set; }

    [StringLength(255)]
    public string ElementPattern { get; set; } = null!;

    [StringLength(50)]
    public string PermissionType { get; set; } = null!;

    public bool IsGranted { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
}
