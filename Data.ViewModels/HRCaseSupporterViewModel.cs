using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class HRCaseSupporterViewModel
{
    [Key]
    public int HRCaseSupporterID { get; set; }

    public int HRCaseID { get; set; }

    public int HRCaseStatusTypeID { get; set; }

    public bool IsForNapthensPeopleProjectTeam { get; set; }

    public bool IsExternalSupportOfficerRequired { get; set; }

    [StringLength(100)]
    public string? ExternalSupportOfficerName { get; set; }

    // Additional Properties
}
