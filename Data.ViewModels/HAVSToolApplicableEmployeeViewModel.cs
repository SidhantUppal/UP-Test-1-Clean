using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HAVSToolApplicableEmployeeViewModel
{
    [Key]
    public int HAVSToolApplicableEmployeeID { get; set; }

    public int UserAreaID { get; set; }

    public int EmployeeID { get; set; }

    public int HAVSToolID { get; set; }

    public int? DailyLimitHours { get; set; }

    public int? DailyLimitMinutes { get; set; }

    public bool IsProhibited { get; set; }

    // Additional Properties
}
