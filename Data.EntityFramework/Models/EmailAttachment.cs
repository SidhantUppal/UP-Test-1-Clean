using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Index("EmailId", Name = "IX_EmailAttachments_EmailId")]
[Index("FileName", Name = "IX_EmailAttachments_FileName")]
public partial class EmailAttachment
{
    [Key]
    public Guid Id { get; set; }

    public Guid EmailId { get; set; }

    [StringLength(255)]
    public string FileName { get; set; } = null!;

    [StringLength(100)]
    public string? ContentType { get; set; }

    public long? Size { get; set; }

    [StringLength(500)]
    public string? FilePath { get; set; }

    [StringLength(500)]
    public string? BlobUrl { get; set; }

    public DateTime? CreatedAt { get; set; }

    [ForeignKey("EmailId")]
    [InverseProperty("EmailAttachments")]
    public virtual InboundEmail Email { get; set; } = null!;
}
