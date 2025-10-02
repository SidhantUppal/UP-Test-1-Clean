using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class EmailMessageAttachmentViewModel
{
    [Key]
    public int EmailMessageAttachmentID { get; set; }

    public int EmailMessageID { get; set; }

    [StringLength(100)]
    public string ContentType { get; set; } = null!;

    [StringLength(255)]
    public string FileName { get; set; } = null!;

    public int FileSize { get; set; }

    public byte[] FileBytes { get; set; } = null!;

    // Additional Properties
}
