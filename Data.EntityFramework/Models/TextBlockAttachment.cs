using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Table("TextBlockAttachment", Schema = "V7")]
public partial class TextBlockAttachment
{
    [Key]
    public int TextBlockAttachmentID { get; set; }

    public int AttachmentID { get; set; }

    public int? TextBlockCollectionID { get; set; }

    public int? TextBlockID { get; set; }

    public bool? IsPolicyLevelAttachment { get; set; }

    [ForeignKey("AttachmentID")]
    [InverseProperty("TextBlockAttachments")]
    public virtual Attachment Attachment { get; set; } = null!;

    [ForeignKey("TextBlockID")]
    [InverseProperty("TextBlockAttachments")]
    public virtual TextBlock? TextBlock { get; set; }

    [ForeignKey("TextBlockCollectionID")]
    [InverseProperty("TextBlockAttachments")]
    public virtual TextBlockCollection? TextBlockCollection { get; set; }
}
