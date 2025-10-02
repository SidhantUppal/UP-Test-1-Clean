using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class RiskLevelColourTypeViewModel
{
    [Key]
    public int RiskLevelColourTypeID { get; set; }

    [StringLength(50)]
    public string ColorName { get; set; } = null!;

    [StringLength(7)]
    public string ColorHex { get; set; } = null!;

    [StringLength(200)]
    public string? ColorDescription { get; set; }

    public bool? IsActive { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
