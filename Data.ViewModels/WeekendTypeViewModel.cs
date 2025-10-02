using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class WeekendTypeViewModel
{
    [Key]
    public int WeekendTypeID { get; set; }

    public int? RegionTypeID { get; set; }

    public int DayOfWeek { get; set; }

    [StringLength(100)]
    public string DayNote { get; set; } = null!;

    // Additional Properties
}
