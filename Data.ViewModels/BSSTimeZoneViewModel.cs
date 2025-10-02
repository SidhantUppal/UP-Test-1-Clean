using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class BSSTimeZoneViewModel
{
    [Key]
    public int TimeZoneID { get; set; }

    [StringLength(5)]
    public string Code { get; set; } = null!;

    [StringLength(50)]
    public string Name { get; set; } = null!;

    public double UTCOffsetHours { get; set; }

    [StringLength(10)]
    public string DateFormat { get; set; } = null!;

    // Additional Properties
}
