using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DocumentViewModel
{
    [Key]
    public int DocumentID { get; set; }

    public int UserAreaID { get; set; }

    [StringLength(50)]
    public string DocumentType { get; set; } = null!;

    [StringLength(255)]
    public string OriginalFileName { get; set; } = null!;

    [StringLength(255)]
    public string DisplayName { get; set; } = null!;

    public string? Description { get; set; }

    public long FileSize { get; set; }

    [StringLength(100)]
    public string? MimeType { get; set; }

    [StringLength(500)]
    public string? StorageUrl { get; set; }

    public int? FolderID { get; set; }

    [StringLength(50)]
    public string PrivacyLevel { get; set; } = null!;

    [StringLength(50)]
    public string Status { get; set; } = null!;

    public string? Tags { get; set; }

    public bool IsStarred { get; set; }

    public bool IsEncrypted { get; set; }

    [StringLength(50)]
    public string? EncryptionMethod { get; set; }

    [StringLength(255)]
    public string? EncryptionKeyID { get; set; }

    [StringLength(100)]
    public string? ExternalDocumentID { get; set; }

    [StringLength(100)]
    public string? LegacySystemSource { get; set; }

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
