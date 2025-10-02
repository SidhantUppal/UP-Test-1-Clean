using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ContractorCompanyAttachment", Schema = "V7")]
[Index("ContractorCompanyID", Name = "IX_ContractorCompanyAttachment_ContractorCompanyID_includes")]
public partial class ContractorCompanyAttachment
{
    [Key]
    public int ContractorCompanyAttachmentID { get; set; }

    public int ContractorCompanyID { get; set; }

    public int AttachmentID { get; set; }

    [ForeignKey("AttachmentID")]
    [InverseProperty("ContractorCompanyAttachments")]
    public virtual Attachment Attachment { get; set; } = null!;

    [ForeignKey("ContractorCompanyID")]
    [InverseProperty("ContractorCompanyAttachments")]
    public virtual ContractorCompany ContractorCompany { get; set; } = null!;

    [InverseProperty("ContractorCompanyAttachment")]
    public virtual ICollection<ContractorSiteAccessAttachment> ContractorSiteAccessAttachments { get; set; } = new List<ContractorSiteAccessAttachment>();
}
