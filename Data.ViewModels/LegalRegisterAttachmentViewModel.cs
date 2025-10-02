using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class LegalRegisterAttachmentViewModel
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

    // Additional Properties
}
