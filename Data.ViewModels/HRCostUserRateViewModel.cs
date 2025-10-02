using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HRCostUserRateViewModel
{
    [Key]
    public int HRCostUserRateID { get; set; }

    public decimal Level1AnnualCostGBP { get; set; }

    public decimal Level2AnnualCostGBP { get; set; }

    public decimal Level3AnnualCostGBP { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
