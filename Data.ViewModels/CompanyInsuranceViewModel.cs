using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class CompanyInsuranceViewModel
{
    [Key]
    public int CompanyInsuranceID { get; set; }

    public int CompanyID { get; set; }

    [StringLength(255)]
    public string PolicyName { get; set; } = null!;

    [StringLength(255)]
    public string? PolicyNumber { get; set; }

    public DateTimeOffset? RenewalDate { get; set; }

    // Additional Properties
}
