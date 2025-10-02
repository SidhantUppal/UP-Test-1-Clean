using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.ViewModels;

public class DocumentSignatureViewModel
{
    [Key]
    public int SignatureID { get; set; }

    public int DocumentID { get; set; }

    public int SignerUserID { get; set; }

    [StringLength(50)]
    public string SignatureProvider { get; set; } = null!;

    [StringLength(50)]
    public string SignatureStatus { get; set; } = null!;

    public DateTimeOffset? SignedAt { get; set; }

    public string? SignatureData { get; set; }

    [StringLength(50)]
    public string? IPAddress { get; set; }

    [StringLength(500)]
    public string? SignedDocumentUrl { get; set; }

    public DateTimeOffset? ExpiresAt { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    // Additional Properties
}
