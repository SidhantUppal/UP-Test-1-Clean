using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ContractorCompanySSIP", Schema = "V7")]
public partial class ContractorCompanySSIP
{
    [Key]
    public int ContractorCompanySSIPID { get; set; }

    public int ContractorCompanyID { get; set; }

    public int SSIPID { get; set; }

    public int? AttachmentID { get; set; }

    public DateOnly? RenewalDate { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("ContractorCompanySSIPArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("AttachmentID")]
    [InverseProperty("ContractorCompanySSIPs")]
    public virtual Attachment? Attachment { get; set; }

    [ForeignKey("ContractorCompanyID")]
    [InverseProperty("ContractorCompanySSIPs")]
    public virtual ContractorCompany ContractorCompany { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("ContractorCompanySSIPCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;

    [ForeignKey("ModifiedByUserID")]
    [InverseProperty("ContractorCompanySSIPModifiedByUsers")]
    public virtual User? ModifiedByUser { get; set; }

    [ForeignKey("SSIPID")]
    [InverseProperty("ContractorCompanySSIPs")]
    public virtual SSIP SSIP { get; set; } = null!;
}
