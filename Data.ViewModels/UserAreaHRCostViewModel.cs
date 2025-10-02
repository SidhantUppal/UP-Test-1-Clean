using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class UserAreaHRCostViewModel
{
    [Key]
    public int UserAreaHRCostID { get; set; }

    public int UserAreaID { get; set; }

    public int HRCostBaseRateID { get; set; }

    public int HRCostUserRateID { get; set; }

    public int TotalPurchasedEmployees { get; set; }

    public int TotalPurchasedUsers { get; set; }

    public byte ProductLevel { get; set; }

    public string? Comments { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
}
