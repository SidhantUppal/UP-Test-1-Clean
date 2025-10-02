using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ContractorSiteAccessAttachment", Schema = "V7")]
public partial class ContractorSiteAccessAttachment
{
    [Key]
    public int ContractorSiteAccessAttachmentID { get; set; }

    public int ContractorSiteAccessID { get; set; }

    public int ContractorCompanyAttachmentID { get; set; }

    public int LinkedByUserID { get; set; }

    public DateTimeOffset LinkedDate { get; set; }

    [StringLength(255)]
    public string? Comments { get; set; }

    [ForeignKey("ContractorCompanyAttachmentID")]
    [InverseProperty("ContractorSiteAccessAttachments")]
    public virtual ContractorCompanyAttachment ContractorCompanyAttachment { get; set; } = null!;

    [ForeignKey("ContractorSiteAccessID")]
    [InverseProperty("ContractorSiteAccessAttachments")]
    public virtual ContractorSiteAccess ContractorSiteAccess { get; set; } = null!;

    [InverseProperty("ContractorSiteAccessAttachment")]
    public virtual ICollection<ContractorSiteAccessRequirement> ContractorSiteAccessRequirements { get; set; } = new List<ContractorSiteAccessRequirement>();

    [ForeignKey("LinkedByUserID")]
    [InverseProperty("ContractorSiteAccessAttachments")]
    public virtual User LinkedByUser { get; set; } = null!;
}
