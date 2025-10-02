using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Data.EntityFramework.Models;

[Index("LegalRegisterID", Name = "IX_LegalRegisterAttachments_LegalRegisterID")]
[Index("UploadDate", Name = "IX_LegalRegisterAttachments_UploadDate", AllDescending = true)]
public partial class LegalRegisterAttachment
{
    [Key]
    public int AttachmentID { get; set; }

    public int LegalRegisterID { get; set; }

    [StringLength(500)]
    public string FileName { get; set; } = null!;

    [StringLength(100)]
    public string? FileType { get; set; }

    public long? FileSize { get; set; }

    public byte[]? FileData { get; set; }

    [StringLength(1000)]
    public string? FileUrl { get; set; }

    public DateTimeOffset? UploadDate { get; set; }

    [StringLength(100)]
    public string? UploadedBy { get; set; }

    [ForeignKey("LegalRegisterID")]
    [InverseProperty("LegalRegisterAttachments")]
    public virtual LegalRegister LegalRegister { get; set; } = null!;
}
