using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Index("RoleID", Name = "UQ_RoleNavigationPreferences_RoleID", IsUnique = true)]
public partial class RoleNavigationPreference
{
    [Key]
    public int RoleNavigationPreferencesID { get; set; }

    [StringLength(50)]
    public string RoleID { get; set; } = null!;

    [StringLength(100)]
    public string RoleName { get; set; } = null!;

    public string NavigationPreferences { get; set; } = null!;

    public DateTimeOffset? CreatedDate { get; set; }

    public DateTimeOffset? UpdatedDate { get; set; }
}
