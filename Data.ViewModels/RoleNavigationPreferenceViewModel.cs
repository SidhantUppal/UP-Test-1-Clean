using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RoleNavigationPreferenceViewModel
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

    // Additional Properties
}
