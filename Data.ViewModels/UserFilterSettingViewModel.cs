using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserFilterSettingViewModel
{
    [Key]
    public int UserFilterSettingID { get; set; }

    public int UserAreaID { get; set; }

    public int? UserID { get; set; }

    [StringLength(50)]
    public string ControllerName { get; set; } = null!;

    [StringLength(50)]
    public string ActionName { get; set; } = null!;

    public bool? IsDefaultExpanded { get; set; }

    [StringLength(50)]
    public string? DefaultOrderValue { get; set; }

    // Additional Properties
}
