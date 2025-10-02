using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class AttachmentViewModel
{
    [Key]
    public int AttachmentID { get; set; }

    [StringLength(250)]
    public string? AttachmentGuidName { get; set; }

    [StringLength(20)]
    public string AttachmentType { get; set; } = null!;

    [StringLength(255)]
    public string DisplayName { get; set; } = null!;

    [StringLength(255)]
    public string FileName { get; set; } = null!;

    public int FileSizeBytes { get; set; }

    [StringLength(100)]
    public string ContentType { get; set; } = null!;

    public bool IsPublic { get; set; }

    public int CreatedByUserID { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public int? ModifiedByUserID { get; set; }

    public DateTimeOffset? ModifiedDate { get; set; }

    public int? ArchivedByUserID { get; set; }

    public DateTimeOffset? ArchivedDate { get; set; }

    // Additional Properties
    public string? CreatedByUserName { get; set; }
    public string? ModifiedByUserName { get; set; }
    public string? ArchivedByUserName { get; set; }
}
