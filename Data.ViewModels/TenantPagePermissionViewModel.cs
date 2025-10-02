using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TenantPagePermissionViewModel
{
    [Key]
    public int TenantPagePermissionID { get; set; }

    public int TenantID { get; set; }

    public int TenantRoleID { get; set; }

    [StringLength(255)]
    public string PageRoute { get; set; } = null!;

    [StringLength(50)]
    public string AccessLevel { get; set; } = null!;

    public bool IsGranted { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
}
