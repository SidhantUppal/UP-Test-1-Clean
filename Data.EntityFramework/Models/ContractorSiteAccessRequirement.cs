using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ContractorSiteAccessRequirement", Schema = "V7")]
public partial class ContractorSiteAccessRequirement
{
    [Key]
    public int ContractorSiteAccessRequirementID { get; set; }

    public int ContractorSiteAccessID { get; set; }

    public int RequirementType { get; set; }

    [StringLength(150)]
    public string? RequirementTitle { get; set; }

    public int? ContractorSiteAccessAttachmentID { get; set; }

    public int? TaskID { get; set; }

    public DateTimeOffset? ExemptUntilDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    public int? UserAreaFormResponseID { get; set; }

    public int? ContractorSiteAccessPersonnelID { get; set; }

    public bool IsComplete { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ContractorSiteAccessRequirementArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("ContractorSiteAccessID")]
    [InverseProperty("ContractorSiteAccessRequirements")]
    public virtual ContractorSiteAccess ContractorSiteAccess { get; set; } = null!;

    [ForeignKey("ContractorSiteAccessAttachmentID")]
    [InverseProperty("ContractorSiteAccessRequirements")]
    public virtual ContractorSiteAccessAttachment? ContractorSiteAccessAttachment { get; set; }

    [ForeignKey("ContractorSiteAccessPersonnelID")]
    [InverseProperty("ContractorSiteAccessRequirements")]
    public virtual ContractorSiteAccessPersonnel? ContractorSiteAccessPersonnel { get; set; }

    [InverseProperty("ContractorSiteAccessRequirement")]
    public virtual ICollection<ContractorSiteAccessSignOff> ContractorSiteAccessSignOffs { get; set; } = new List<ContractorSiteAccessSignOff>();

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ContractorSiteAccessRequirementCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ContractorSiteAccessRequirementModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("TaskID")]
    [InverseProperty("ContractorSiteAccessRequirements")]
    public virtual BSSTask? Task { get; set; }

    [ForeignKey("UserAreaFormResponseID")]
    [InverseProperty("ContractorSiteAccessRequirements")]
    public virtual UserAreaFormResponse? UserAreaFormResponse { get; set; }
}
