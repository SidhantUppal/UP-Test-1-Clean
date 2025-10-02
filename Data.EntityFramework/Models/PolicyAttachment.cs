using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("PolicyAttachment", Schema = "V7")]
[Index("PolicyID", Name = "IX_PolicyAttachment_PolicyID")]
public partial class PolicyAttachment
{
    [Key]
    public int PolicyAttachmentID { get; set; }

    public int UserAreaID { get; set; }

    public int PolicyID { get; set; }

    public int AttachmentID { get; set; }

    [StringLength(50)]
    public string? AttachmentType { get; set; }

    [StringLength(255)]
    public string AttachmentTitle { get; set; } = null!;

    [StringLength(500)]
    public string? AttachmentDescription { get; set; }

    public int? SequenceOrder { get; set; }

    public bool? IsRequired { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    [ForeignKey("AttachmentID")]
    [InverseProperty("PolicyAttachments")]
    public virtual Attachment Attachment { get; set; } = null!;

    [ForeignKey("PolicyID")]
    [InverseProperty("PolicyAttachments")]
    public virtual Policy Policy { get; set; } = null!;

    [ForeignKey("UserAreaID")]
    [InverseProperty("PolicyAttachments")]
    public virtual UserArea UserArea { get; set; } = null!;
}
