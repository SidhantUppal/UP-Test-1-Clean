using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("CaseAttachment", Schema = "V7")]
[Index("CaseID", "AttachmentID", Name = "IX_CaseAttachment_CaseIDAttachmentID")]
public partial class CaseAttachment
{
    [Key]
    public int CaseAttachmentID { get; set; }

    public int CaseID { get; set; }

    public int AttachmentID { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("ArchivedByUserID")]
    [InverseProperty("CaseAttachmentArchivedByUsers")]
    public virtual User? ArchivedByUser { get; set; }

    [ForeignKey("AttachmentID")]
    [InverseProperty("CaseAttachments")]
    public virtual Attachment Attachment { get; set; } = null!;

    [ForeignKey("CaseID")]
    [InverseProperty("CaseAttachments")]
    public virtual Case Case { get; set; } = null!;

    [ForeignKey("CreatedByUserID")]
    [InverseProperty("CaseAttachmentCreatedByUsers")]
    public virtual User CreatedByUser { get; set; } = null!;
}
