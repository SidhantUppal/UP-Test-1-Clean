using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TenantServicePermissionViewModel
{
    [Key]
    public int TenantServicePermissionID { get; set; }

    public int TenantID { get; set; }

    [StringLength(100)]
    public string ServiceName { get; set; } = null!;

    public bool IsEnabled { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
}
