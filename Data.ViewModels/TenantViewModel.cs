using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class TenantViewModel
{
    [Key]
    public int TenantID { get; set; }

    [StringLength(255)]
    public string Name { get; set; } = null!;

    [StringLength(255)]
    public string AzureADTenantID { get; set; } = null!;

    [StringLength(20)]
    public string Status { get; set; } = null!;

    // Additional Properties
}
