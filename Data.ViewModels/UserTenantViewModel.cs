using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserTenantViewModel
{
    [Key]
    public int UserTenantID { get; set; }

    public int UserID { get; set; }

    public int TenantID { get; set; }

    [StringLength(20)]
    public string? Status { get; set; }

    // Additional Properties
}
