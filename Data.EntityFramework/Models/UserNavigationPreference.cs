using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Index("UpdatedDate", Name = "IX_UserNavigationPreferences_UpdatedDate", AllDescending = true)]
[Index("UserID", Name = "IX_UserNavigationPreferences_UserID_Unique", IsUnique = true)]
public partial class UserNavigationPreference
{
    [Key]
    public int UserNavigationPreferencesID { get; set; }

    public int UserID { get; set; }

    public string NavigationPreferences { get; set; } = null!;

    public DateTimeOffset? CreatedDate { get; set; }

    public DateTimeOffset? UpdatedDate { get; set; }
}
