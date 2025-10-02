using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("SystemCredential", Schema = "V7")]
public partial class SystemCredential
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
}
