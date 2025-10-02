using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("ContractorCompetencyAttachment", Schema = "V7")]
[Index("ContractorCompetencyID", Name = "IX_ContractorCompetencyAttachment_ContractorCompetencyID_includes")]
public partial class ContractorCompetencyAttachment
{
    [Key]
    public int ContractorCompetencyAttachmentID { get; set; }

    public int ContractorCompetencyID { get; set; }

    public int AttachmentID { get; set; }

    [ForeignKey("AttachmentID")]
    [InverseProperty("ContractorCompetencyAttachments")]
    public virtual Attachment Attachment { get; set; } = null!;

    [ForeignKey("ContractorCompetencyID")]
    [InverseProperty("ContractorCompetencyAttachments")]
    public virtual ContractorCompetency ContractorCompetency { get; set; } = null!;
}
