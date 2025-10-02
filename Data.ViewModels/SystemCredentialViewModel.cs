using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class SystemCredentialViewModel
{
    [Key]
    public int SystemCredentialID { get; set; }

    [StringLength(255)]
    public string? Username { get; set; }

    [StringLength(50)]
    public string Password { get; set; } = null!;

    public int SystemCredentialEnumType { get; set; }

    [StringLength(255)]
    public string? Description { get; set; }

    public bool IsEnabled { get; set; }

    // Additional Properties
}
