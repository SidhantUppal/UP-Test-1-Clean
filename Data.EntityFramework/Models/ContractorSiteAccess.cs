using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ContractorSiteAccess", Schema = "V7")]
public partial class ContractorSiteAccess
{
    [Key]
    public int ContractorSiteAccessID { get; set; }

    public int ContractorCompanyID { get; set; }

    public int SiteUserAreaID { get; set; }

    public int? SiteLocationID { get; set; }

    public DateTimeOffset StartDateTime { get; set; }

    public DateTimeOffset EndDateTime { get; set; }

    [StringLength(1000)]
    public string? WorkDetails { get; set; }

    public string? GeneralComments { get; set; }

    public DateTimeOffset? ClosedDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public string? EntryInstructions { get; set; }

    [StringLength(100)]
    public string? ContractingManagerName { get; set; }

    public bool IsRaisedByContractor { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ContractorSiteAccessArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("ContractorCompanyID")]
    [InverseProperty("ContractorSiteAccesses")]
    public virtual ContractorCompany ContractorCompany { get; set; } = null!;

    [InverseProperty("ContractorSiteAccess")]
    public virtual ICollection<ContractorSiteAccessAttachment> ContractorSiteAccessAttachments { get; set; } = new List<ContractorSiteAccessAttachment>();

    [InverseProperty("ContractorSiteAccess")]
    public virtual ICollection<ContractorSiteAccessPersonnel> ContractorSiteAccessPersonnel { get; set; } = new List<ContractorSiteAccessPersonnel>();

    [InverseProperty("ContractorSiteAccess")]
    public virtual ICollection<ContractorSiteAccessRequirement> ContractorSiteAccessRequirements { get; set; } = new List<ContractorSiteAccessRequirement>();

    [InverseProperty("ContractorSiteAccess")]
    public virtual ICollection<ContractorSiteAccessSignOff> ContractorSiteAccessSignOffs { get; set; } = new List<ContractorSiteAccessSignOff>();

    [InverseProperty("ContractorSiteAccess")]
    public virtual ICollection<ContractorSiteAccessStatus> ContractorSiteAccessStatuses { get; set; } = new List<ContractorSiteAccessStatus>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ContractorSiteAccessCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ContractorSiteAccessModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("SiteLocationID")]
    [InverseProperty("ContractorSiteAccesses")]
    public virtual Location? SiteLocation { get; set; }

    [ForeignKey("SiteUserAreaID")]
    [InverseProperty("ContractorSiteAccesses")]
    public virtual UserArea SiteUserArea { get; set; } = null!;
}
