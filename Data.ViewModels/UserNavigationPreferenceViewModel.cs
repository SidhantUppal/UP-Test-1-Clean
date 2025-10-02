using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserNavigationPreferenceViewModel
{
    [Key]
    public int UserNavigationPreferencesID { get; set; }

    public int UserID { get; set; }

    public string NavigationPreferences { get; set; } = null!;

    public DateTimeOffset? CreatedDate { get; set; }

    public DateTimeOffset? UpdatedDate { get; set; }

    // Additional Properties
}
