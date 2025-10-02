using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class ContractorSiteAccessSignOffViewModel
{
    [Key]
    public int ContractorSiteAccessSignOffID { get; set; }

    public int ContractorSiteAccessID { get; set; }

    public int? ContractorSiteAccessRequirementID { get; set; }

    public DateTimeOffset AccessDate { get; set; }

    public bool IsContractor { get; set; }

    public bool IsSignOut { get; set; }

    public string? SignatureText { get; set; }

    public DateTimeOffset? SignatureDate { get; set; }

    public int? LoggedInUserID { get; set; }

    // Additional Properties
}
