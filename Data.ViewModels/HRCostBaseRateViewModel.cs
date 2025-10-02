using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HRCostBaseRateViewModel
{
    [Key]
    public int HRCostBaseRateID { get; set; }

    public decimal Tier1AnnualCostGBP { get; set; }

    public decimal Tier2AnnualCostGBP { get; set; }

    public decimal Tier3AnnualCostGBP { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
}
