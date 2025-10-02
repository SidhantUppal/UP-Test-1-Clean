using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ContractorSiteAccessSignOff", Schema = "V7")]
public partial class ContractorSiteAccessSignOff
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

    [ForeignKey("ContractorSiteAccessID")]
    [InverseProperty("ContractorSiteAccessSignOffs")]
    public virtual ContractorSiteAccess ContractorSiteAccess { get; set; } = null!;

    [ForeignKey("ContractorSiteAccessRequirementID")]
    [InverseProperty("ContractorSiteAccessSignOffs")]
    public virtual ContractorSiteAccessRequirement? ContractorSiteAccessRequirement { get; set; }

    [ForeignKey("LoggedInUserID")]
    [InverseProperty("ContractorSiteAccessSignOffs")]
    public virtual User? LoggedInUser { get; set; }
}
