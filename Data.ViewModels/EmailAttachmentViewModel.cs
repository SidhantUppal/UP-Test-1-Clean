using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class EmailAttachmentViewModel
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

    // Additional Properties
}
