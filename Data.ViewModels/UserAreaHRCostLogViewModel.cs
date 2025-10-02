using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaHRCostLogViewModel
{
    [Key]
    public int UserAreaHRCostLogID { get; set; }

    public int UserAreaID { get; set; }

    public decimal BaseRateAnnualCostGBP { get; set; }

    public decimal UserRateAnnualCostGBP { get; set; }

    public int TotalPurchasedEmployees { get; set; }

    public int TotalActualEmployees { get; set; }

    public int TotalPurchasedUsers { get; set; }

    public int TotalActualUsers { get; set; }

    public byte ProductLevel { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
